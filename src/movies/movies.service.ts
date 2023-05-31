import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment, Movie } from 'src/schemas';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie)
    private movieModel: typeof Movie,
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.findAll();
  }

  async findOne(id: string): Promise<Movie> {
    return this.movieModel.findOne({
      where: {
        id,
      },
    });
  }

  async findComments(id: string): Promise<Comment[]> {
    return this.commentModel.findAll({
      where: {
        movieId: id,
      },
    });
  }
}
