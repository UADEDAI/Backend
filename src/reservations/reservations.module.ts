import { Module } from '@nestjs/common';
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
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Reservation,
      ReservationSeat,
      Screening,
      Seat,
      Room,
      Cinema,
      Movie,
      User,
      OtpReservation,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
