import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesController } from './movies.controller';
import { Comment, Movie, User } from 'src/schemas';

@Module({
  imports: [SequelizeModule.forFeature([Movie, Comment, User])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
