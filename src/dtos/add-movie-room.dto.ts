import { IsNumber } from 'class-validator';

export class AddMovieRoomDTO {
  @IsNumber()
  movieId: number;
}
