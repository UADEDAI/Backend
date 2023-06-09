import { IsNotEmpty, IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsInt()
  cinemaId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  numRows: number;

  @IsNotEmpty()
  @IsInt()
  seats: number;

  @IsNotEmpty()
  @IsBoolean()
  enabled: boolean;
}
