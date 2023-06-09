import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ScreeningsService } from './screenings.service';
import { Screening } from 'src/schemas';
import { CreateScreeningDto } from 'src/dtos';

@Controller('screenings')
export class ScreeningsController {
  constructor(private readonly screeningsService: ScreeningsService) {}

  @Get()
  findAll(): Promise<Screening[]> {
    return this.screeningsService.findAllScreenings();
  }

  @Post()
  createOne(
    @Body() createScreeningDto: CreateScreeningDto,
  ): Promise<Screening> {
    return this.screeningsService.createScreening(createScreeningDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Screening> {
    return this.screeningsService.findOneScreening(id);
  }

  @Delete(':id')
  deleteOne(
    @Param('id') id: string,
  ): Promise<{ message: string; statusCode: number }> {
    return this.screeningsService.deleteScreening(id);
  }

  @Get(':id/available-seats')
  findAvailableSeats(
    @Param('id') id: string,
    @Query('year') year: string,
    @Query('month') month: string,
    @Query('day') day: string,
  ): Promise<any> {
    return this.screeningsService.findAvailableSeats(
      id,
      parseInt(year),
      parseInt(month),
      parseInt(day),
    );
  }
}
