import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/dtos';
import { JwtAuthGuard } from 'src/auth/auth.jwt.guard';
import { GetUser } from 'decorators/user';
import { User } from 'src/schemas';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any) {
    console.log('User id requesting reservations: ' + req.user.id);
    return this.reservationsService.findAllReservations(req.user.id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }
}
