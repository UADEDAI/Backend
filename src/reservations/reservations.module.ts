import { Module } from '@nestjs/common';
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
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from 'src/schemas/otp.schema';
import { OtpService } from 'src/otp/otp.service';

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
      Otp,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, OtpService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
