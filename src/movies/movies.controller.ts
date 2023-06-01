import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie, Comment } from 'src/schemas';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';

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

  @Post(':id/comments')
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.moviesService.createComment(createCommentDto);
  }
}
