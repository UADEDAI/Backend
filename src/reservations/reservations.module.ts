import { Module } from '@nestjs/common';
import {
  Cinema,
  Movie,
  Reservation,
  ReservationSeat,
  Room,
  Screening,
  Seat,
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
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
