import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RESERVATION_MAIL_CONTENT } from '../../constants';
import { sendEmail } from 'services/mailer';
import { CreateReservationDto } from 'src/dtos';
import { generateRandomOtp } from 'src/otp/otp.service';
import {
  Cinema,
  Movie,
  Reservation,
  ReservationSeat,
  Room,
  Screening,
  Seat,
  User,
} from 'src/schemas';
import { Otp } from 'src/schemas/otp.schema';

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
    @InjectModel(Otp)
    private otpModel: typeof Otp,
  ) {}

  async findAllReservations(): Promise<Reservation[]> {
    return this.reservationModel.findAll({
      include: [
        {
          model: Screening,
          include: [Movie, { model: Room, include: [Cinema] }],
        },
      ],
    });
  }

  async findOne(id: string): Promise<Reservation> {
    return this.reservationModel.findOne({
      where: {
        id,
      },
    });
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
      include: [{ model: Room, include: [Cinema] }],
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
      });

      if (reservationSeat) {
        seatsTaken = true;
        break;
      }
    }

    if (seatsTaken) {
      throw new ConflictException('Seats are already taken');
    }

    // Create the reservation
    const reservation = await this.reservationModel.create(
      createReservationObject,
    );

    // Create the reservation seats
    for (const seat of createReservationDto.seats) {
      await this.reservationSeatModel.create({
        reservationId: reservation.id,
        seatId: seat,
        screeningId: createReservationDto.screeningId,
      });
    }

    // Get the user info
    const user = await this.userModel.findOne({
      where: {
        id: createReservationDto.userId,
      },
    });

    // Generate otp
    const otp = new this.otpModel();
    otp.code = generateRandomOtp();
    otp.user = user.id;

    sendEmail(
      user.email,
      RESERVATION_MAIL_CONTENT.subject,
      RESERVATION_MAIL_CONTENT.msg + otp.code,
      `<p>${RESERVATION_MAIL_CONTENT.msg} <b>${otp.code}</b></p>`,
    );

    const reservationInfo = {
      reservation,
      screening,
      seats,
      cinemaName: screening.room.cinema.name,
      roomName: screening.room.name,
      price: screening.room.cinema.price,
      code: otp.code,
    };

    return reservationInfo;
  }
}
