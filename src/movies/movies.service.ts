import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MOVIE_STATUS, MoviesPaginated } from '../../constants';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { Cinema, Comment, Movie, Room, Screening, User } from 'src/schemas';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie)
    private movieModel: typeof Movie,
    @InjectModel(Comment)
    private commentModel: typeof Comment,
    @InjectModel(Cinema)
    private cinemaModel: typeof Cinema,
    @InjectModel(Room)
    private roomModel: typeof Room,
    @InjectModel(Screening)
    private screeningModel: typeof Screening,
    @InjectModel(User)
    private userModel: typeof User,
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
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
    });
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = await this.commentModel.create<any>(
        createCommentDto as any,
      );

      // find all the comments for this movie
      const comments = await this.commentModel.findAll({
        where: {
          movieId: createCommentDto.movieId,
        },
      });

      // calculate the score total
      const score = comments.reduce((acc, comment) => {
        return acc + comment.rating;
      }, 0);

      // calculate the average score
      const averageScore = score / comments.length;

      // modify the movie score
      await this.movieModel.update(
        {
          score: averageScore,
        },
        {
          where: {
            id: createCommentDto.movieId,
          },
        },
      );

      return comment;
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException(
          'User has already commented on this movie',
        );
      }
      throw err;
    }
  }

  async findPremieredMoviesHome(
    lat: number,
    lng: number,
    radius: number,
    page = 1,
    limit = 10,
    title,
    genre,
    score,
  ): Promise<MoviesPaginated> {
    const distanceLimitDegree = radius / 111.32; // 1 degree of latitude approx 111.32 km
    const offset = (page - 1) * limit;

    const where = {
      status: MOVIE_STATUS.SHOWING,
    };

    const whereCinemas = {};

    if (title) {
      where['title'] = {
        [Op.like]: `%${title}%`,
      };
    }

    if (genre) {
      where['genre'] = {
        [Op.like]: `%${genre}%`,
      };
    }

    if (score) {
      where['score'] = {
        [Op.gte]: score,
      };
    }

    if (lat && lng) {
      whereCinemas[Op.and] = Sequelize.where(
        Sequelize.literal(
          `POW((latitude - ${lat}),2) + POW((longitude - ${lng}),2)`,
        ),
        '<=',
        Math.pow(distanceLimitDegree, 2),
      );
    }

    // 1. Find all cinemas that are near the user
    const cinemas = await this.cinemaModel.findAll({
      where: whereCinemas,
    });

    // 2. Find all rooms that belong to these cinemas
    const rooms = await this.roomModel.findAll({
      where: {
        cinemaId: {
          [Op.in]: cinemas.map((cinema) => cinema.id),
        },
      },
    });

    // 3. Find all movies that are shown in these rooms
    const screenings = await this.screeningModel.findAll({
      where: {
        roomId: {
          [Op.in]: rooms.map((room) => room.id),
        },
      },
    });

    where['id'] = {
      [Op.in]: screenings.map((screening) => screening.movieId),
    };

    const moviesNear = await this.movieModel.findAndCountAll({
      where,
      offset,
      limit,
    });

    const showingPagination = {
      page,
      limit,
      totalPages: Math.ceil(moviesNear.count / limit),
      totalResults: moviesNear.count,
    };

    return {
      showing: moviesNear.rows,
      showingPagination,
    };
  }
}
