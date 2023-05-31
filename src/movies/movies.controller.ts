import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie, Comment } from 'src/schemas';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Get(':id/comments')
  findComments(@Param('id') id: string): Promise<Comment[]> {
    return this.moviesService.findComments(id);
  }
}
