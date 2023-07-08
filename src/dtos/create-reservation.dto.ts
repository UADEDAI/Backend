import { IsNotEmpty, IsInt, IsArray } from 'class-validator';

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
}
