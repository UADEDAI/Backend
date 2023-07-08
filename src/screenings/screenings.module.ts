import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Movie,
  Reservation,
  ReservationSeat,
  Room,
  Screening,
  Seat,
} from 'src/schemas';
import { ScreeningsController } from './screenings.controller';
import { ScreeningsService } from './screenings.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Screening,
      Room,
      Movie,
      Seat,
      ReservationSeat,
      Reservation,
    ]),
  ],
  controllers: [ScreeningsController],
  providers: [ScreeningsService],
  exports: [ScreeningsService],
})
export class ScreeningsModule {}
