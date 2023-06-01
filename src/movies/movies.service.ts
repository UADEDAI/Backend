import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
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

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      return await this.commentModel.create<any>(createCommentDto as any);
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException(
          'User has already commented on this movie',
        );
      }
      throw err;
    }
  }
}
