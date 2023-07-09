import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  Cinema,
  ReservationSeat,
  Room,
  Screening,
  Seat,
  User,
} from 'src/schemas';
import { CinemasController } from './cinemas.controller';
import { CinemasService } from './cinemas.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      User,
      Cinema,
      Room,
      Screening,
      Seat,
      ReservationSeat,
    ]),
  ],
  controllers: [CinemasController],
  providers: [CinemasService],
  exports: [CinemasService],
})
export class CinemasModule {}
