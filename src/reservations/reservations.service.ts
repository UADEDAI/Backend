import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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
}
