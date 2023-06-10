import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
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
}
