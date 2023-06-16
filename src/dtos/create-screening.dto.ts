import { IsInt, IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateScreeningDto {
  @IsInt()
  @IsNotEmpty()
  roomId: number;

  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @IsString()
  @IsNotEmpty()
  format: string;

  @IsDateString()
  @IsNotEmpty()
  startAt: Date;

  @IsDateString()
  @IsNotEmpty()
  endAt: Date;
}
