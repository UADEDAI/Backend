import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(
    @Query('page') sPage: number,
    @Query('limit') limit: number,
    @Query('title') title: string,
    @Query('genre') genre: string,
    @Query('score') score: number,
  ) {
    // Coerce the page and limit parameters to numbers and provide default values
    sPage = +sPage || 1;
    limit = +limit || 100;

    return this.moviesService.findAll(sPage, limit, title, genre, score);
  }

  @Get('clients')
  findAllMoviesNearClient(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('distance') distance: number,
    @Query('page') sPage: number,
    @Query('limit') limit: number,
    @Query('title') title: string,
    @Query('genre') genre: string,
    @Query('score') score: number,
  ) {
    console.log('aca: ', lat, lng);
    // Coerce the page and limit parameters to numbers and provide default values
    sPage = +sPage || 1;
    limit = +limit || 100;

    return this.moviesService.findPremieredMoviesHome(
      lat,
      lng,
      distance,
      sPage,
      limit,
      title,
      genre,
      score,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Get(':id/comments')
  findComments(@Param('id') id: string) {
    return this.moviesService.findComments(id);
  }

  @Post(':id/comments')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.moviesService.createComment(createCommentDto);
  }
}
