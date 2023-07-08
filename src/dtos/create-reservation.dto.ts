import { IsNotEmpty, IsInt, IsArray, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  screeningId: number;

  @IsNotEmpty()
  @IsArray()
  seats: number[];

  @IsNotEmpty()
  @IsDateString()
  time: Date;
}
