import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReservationDto } from 'src/dtos';
import { Reservation, ReservationSeat, Screening, Seat } from 'src/schemas';

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
  ) {}

  async findAllReservations(): Promise<Reservation[]> {
    return this.reservationModel.findAll();
  }

  async findOne(id: string): Promise<Reservation> {
    return this.reservationModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const createReservationObject = JSON.parse(
      JSON.stringify(createReservationDto),
    );

    // Validate if screening exists
    const screening = await this.screeningModel.findOne({
      where: {
        id: createReservationDto.screeningId,
      },
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

    return reservation;
  }
}
