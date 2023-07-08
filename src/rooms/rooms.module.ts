import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cinema, Movie, MovieRoom, Room, Screening, Seat } from 'src/schemas';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Cinema,
      Room,
      Movie,
      MovieRoom,
      Screening,
      Seat,
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
