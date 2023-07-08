import { Module } from '@nestjs/common';
import { Reservation, ReservationSeat, Screening, Seat } from 'src/schemas';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Reservation, ReservationSeat, Screening, Seat]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
