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
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto, UpdateCinemaDto } from 'src/dtos';
import { Cinema, Room, Screening } from 'src/schemas';

@Controller('cinemas')
export class CinemasController {
  constructor(private readonly cinemasService: CinemasService) {}

  @Get()
  findAll(): Promise<Cinema[]> {
    return this.cinemasService.findAllCinemas();
  }

  @Get('nearest')
  findNearest(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('distance') distance: number,
    @Query('movie') movie: number,
  ): Promise<Cinema[]> {
    return this.cinemasService.findNearestCinemas(lat, lng, distance, movie);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cinema> {
    return this.cinemasService.findOneCinema(id);
  }

  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    return this.cinemasService.createCinema(createCinemaDto);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateCinemaDto: UpdateCinemaDto,
  ): Promise<Cinema> {
    return this.cinemasService.updateCinema(id, updateCinemaDto);
  }

  @Delete(':id')
  deleteOne(
    @Param('id') id: string,
  ): Promise<{ message: string; statusCode: number }> {
    return this.cinemasService.deleteOne(id);
  }

  @Get(':id/rooms')
  findCinemaRooms(@Param('id') id: string): Promise<Room[]> {
    return this.cinemasService.findAllRooms(id);
  }

  @Get(':id/screenings')
  findCinemaScreenings(
    @Param('id') id: string,
    @Query('date') date: string,
    @Query('movie') movie: string,
  ): Promise<Screening[]> {
    return this.cinemasService.findCinemaScreenings(id, date, movie);
  }
}
