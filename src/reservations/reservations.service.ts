import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RESERVATION_MAIL_CONTENT } from '../../constants';
import { sendEmail } from 'services/mailer';
import { CreateReservationDto } from 'src/dtos';
import { generateRandomOtp } from 'src/otp/otp.service';
import {
  Cinema,
  Movie,
  OtpReservation,
  Reservation,
  ReservationSeat,
  Room,
  Screening,
  Seat,
  User,
} from 'src/schemas';
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation)
    private reservationModel: typeof Reservation,
    @InjectModel(ReservationSeat)
    private reservationSeatModel: typeof ReservationSeat,
    @InjectModel(Seat)
    private seatModel: typeof Seat,
    @InjectModel(Screening)
    private screeningModel: typeof Screening,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(OtpReservation)
    private otpModel: typeof OtpReservation,
  ) {}

  async findAllReservations(userId: number): Promise<Reservation[]> {
    return this.reservationModel.findAll({
      where: {
        userId: userId,
      },
      include: [
        OtpReservation,
        {
          model: Screening,
          include: [Movie, { model: Room, include: [Cinema] }],
        },
      ],
    });
  }
  

  async findOne(id: string) {
    const reservation = await this.reservationModel.findOne({
      where: {
        id,
      },
      include: [
        OtpReservation,
        {
          model: Screening,
          include: [Movie, { model: Room, include: [Cinema] }],
        },
      ],
    });

    const reservationSeats = await this.reservationSeatModel.findAll({
      where: {
        reservationId: reservation.id,
      },
      include: [Seat],
    });

    const seats = [];
    for (const reservationSeat of reservationSeats) {
      seats.push(reservationSeat.seat);
    }

    return { ...reservation.toJSON(), seats };
  }

  async create(createReservationDto: CreateReservationDto) {
    const createReservationObject = JSON.parse(
      JSON.stringify(createReservationDto),
    );

    // Validate if screening exists
    const screening = await this.screeningModel.findOne({
      where: {
        id: createReservationDto.screeningId,
      },
      include: [Movie, { model: Room, include: [Cinema] }],
    });

    if (!screening) {
      throw new ConflictException('Screening does not exist');
    }

    if (createReservationObject.seats.length === 0) {
      throw new ConflictException('No seats were selected');
    }

    // Validate if seats exist
    const seats = await this.seatModel.findAll({
      where: {
        id: createReservationDto.seats,
      },
    });

    if (seats.length !== createReservationDto.seats.length) {
      throw new ConflictException('Seats do not exist');
    }

    // Validate if reservation seats are available
    let seatsTaken = false;
    for (const seat of createReservationDto.seats) {
      const reservationSeat = await this.reservationSeatModel.findOne({
        where: {
          seatId: seat,
          screeningId: createReservationDto.screeningId,
        },
        include: [Reservation],
      });

      if (!reservationSeat) {
        continue;
      }

      const reservedDate = new Date(reservationSeat.reservation.time);
      const newReservationDate = new Date(createReservationObject.time);

      const isSameYearMonthDay = isSameDay(reservedDate, newReservationDate);

      if (reservationSeat && isSameYearMonthDay) {
        seatsTaken = true;
        break;
      }
    }

    if (seatsTaken) {
      throw new ConflictException('Seats are already taken');
    }

    const parsedDate = new Date(createReservationObject.time);

    const formattedDate = format(parsedDate, "d MMMM yyyy, HH'hs'", {
      locale: es,
    });

    // Get the user info
    const user = await this.userModel.findOne({
      where: {
        id: createReservationDto.userId,
      },
    });

    // Generate otp
    const otp = new this.otpModel();
    otp.code = generateRandomOtp();
    otp.userId = user.id;

    await otp.save();

    createReservationObject.otpId = otp.id;

    // Create the reservation
    const reservation = await this.reservationModel.create(
      createReservationObject,
      {
        include: [
          {
            model: Screening,
            include: [Movie, { model: Room, include: [Cinema] }],
          },
        ],
      },
    );

    reservation.setDataValue('screening', screening);

    reservation.setDataValue('otp', otp);

    // Create the reservation seats
    for (const seat of createReservationDto.seats) {
      await this.reservationSeatModel.create({
        reservationId: reservation.id,
        seatId: seat,
        screeningId: createReservationDto.screeningId,
      });
    }

    // Format the seats
    const seatsFormatted = seats
      .map((seat) => `F${seat.row}A${seat.number}`)
      .join(', ');

    sendEmail(
      user.email,
      RESERVATION_MAIL_CONTENT.subject,
      RESERVATION_MAIL_CONTENT.msg + otp.code,
      `<div>
        <h2>${RESERVATION_MAIL_CONTENT.msg} para ${screening.movie.title}</h2>
        <p>Cine: ${screening.room.cinema.name}</p>
        <p>Sala: ${screening.room.name}</p>
        <p>Dirección: ${screening.room.cinema.street} ${screening.room.cinema.streetNum}</p>
        <p>Fecha: ${formattedDate}</p>
        <p>Idioma: ${screening.format}</p>
        <p>Asientos: ${seatsFormatted}</p>
        <p>Monto: $${screening.room.cinema.price}</p>
        <p>Código: ${otp.code}</p>
      </div>`,
    );

    const reservationInfo = {
      ...reservation.toJSON(),
      seats,
    };

    return reservationInfo;
  }
}
