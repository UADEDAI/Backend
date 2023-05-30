import { Module } from '@nestjs/common';
import { Movie } from './movies.schemas';
import { MoviesService } from './movies.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MoviesController } from './movies.controller';

@Module({
  imports: [SequelizeModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
