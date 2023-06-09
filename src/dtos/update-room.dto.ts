import { IsOptional, IsInt, IsString, IsBoolean } from 'class-validator';

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  numRows?: number;

  @IsOptional()
  @IsInt()
  seats?: number;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
