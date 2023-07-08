import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesController } from './movies.controller';
import { Cinema, Comment, Movie, Room, Screening, User } from 'src/schemas';

@Module({
  imports: [
    SequelizeModule.forFeature([Movie, Comment, User, Cinema, Screening, Room]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
