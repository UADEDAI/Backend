import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { AddMovieRoomDTO, CreateRoomDto, UpdateCinemaDto } from 'src/dtos';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('includes') includes: string) {
    return this.roomsService.findOne(id, includes);
  }

  @Post()
  createOne(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() updateRoomDto: UpdateCinemaDto) {
    return this.roomsService.updateOne(id, updateRoomDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.roomsService.deleteOne(id);
  }

  @Get(':id/movies')
  findRoomMovies(@Param('id') id: string) {
    return this.roomsService.findAllMovies(id);
  }

  @Post(':id/movies')
  addMovieToRoom(@Param('id') id: string, @Body() body: AddMovieRoomDTO) {
    return this.roomsService.addMovieToRoom(id, body);
  }

  @Get(':id/movies/premiers')
  findPremieredMovies(@Param('id') id: string) {
    return this.roomsService.findPremieredMovies(id);
  }

  @Get(':id/movies/coming-soon')
  findComingSoonMovies(@Param('id') id: string) {
    return this.roomsService.findComingSoonMovies(id);
  }
}
