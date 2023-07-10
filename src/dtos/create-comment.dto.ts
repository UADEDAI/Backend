import { IsNotEmpty, IsInt, Min, Max, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  movieId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;
}
