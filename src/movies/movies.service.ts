import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MOVIE_STATUS, MoviesPaginated } from '../../constants';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { Comment, Movie } from 'src/schemas';
import { Op } from 'sequelize';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie)
    private movieModel: typeof Movie,
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
    title,
    genre,
    score,
  ): Promise<MoviesPaginated> {
    const offsetShowing = (page - 1) * limit;
    const offsetComingSoon = (page - 1) * limit;
    const whereShowing = {
      status: MOVIE_STATUS.SHOWING,
    };
    const whereComingSoon = {
      status: MOVIE_STATUS.COMING_SOON,
    };

    if (title) {
      whereShowing['title'] = {
        [Op.like]: `%${title}%`,
      };
      whereComingSoon['title'] = {
        [Op.like]: `%${title}%`,
      };
    }

    if (genre) {
      whereShowing['genre'] = {
        [Op.like]: `%${genre}%`,
      };
      whereComingSoon['genre'] = {
        [Op.like]: `%${genre}%`,
      };
    }

    if (score) {
      whereShowing['score'] = score;
      whereComingSoon['score'] = score;
    }

    const premieredMovies = await this.movieModel.findAndCountAll({
      where: whereShowing,
      offset: offsetShowing,
      limit,
    });

    const comingSoonMovies = await this.movieModel.findAndCountAll({
      where: whereComingSoon,
      offset: offsetComingSoon,
      limit,
    });

    const showingPagination = {
      page,
      limit,
      totalPages: Math.ceil(premieredMovies.count / limit),
      totalResults: premieredMovies.count,
    };

    const comingSoonPagination = {
      page,
      limit,
      totalPages: Math.ceil(comingSoonMovies.count / limit),
      totalResults: comingSoonMovies.count,
    };

    return {
      showingPagination,
      comingSoonPagination,
      showing: premieredMovies.rows,
      comingSoon: comingSoonMovies.rows,
    };
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
