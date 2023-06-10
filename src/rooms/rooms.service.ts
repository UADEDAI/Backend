import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MOVIE_STATUS } from '../../constants';
import { AddMovieRoomDTO, CreateRoomDto, UpdateRoomDto } from 'src/dtos';
import { Movie, MovieRoom, Room } from 'src/schemas';
import { Op } from 'sequelize';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room,
    @InjectModel(Movie)
    private movieModel: typeof Movie,
    @InjectModel(MovieRoom)
    private movieRoomModel: typeof MovieRoom,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomModel.findAll();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findOne({
      where: {
        id,
      },
      include: Movie,
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const existingRoom = await this.roomModel.findOne({
      where: {
        name: createRoomDto.name,
        cinemaId: createRoomDto.cinemaId,
      },
    });

    if (existingRoom) {
      throw new ConflictException(
        'A room with this name already exists in the given cinema.',
      );
    }

    // Convert the CreateRoomDto class instance to a plain object
    const createRoomObject = JSON.parse(JSON.stringify(createRoomDto));

    return this.roomModel.create(createRoomObject);
  }

  async updateOne(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);

    await room.update(updateRoomDto);
    await room.reload();

    return room;
  }

  async deleteOne(
    id: string,
  ): Promise<{ message: string; statusCode: number }> {
    const rowsAffected = await this.roomModel.destroy({
      where: {
        id,
      },
    });

    if (rowsAffected > 0) {
      return {
        message: 'Room deleted successfully',
        statusCode: HttpStatus.OK,
      };
    }

    return {
      message: 'Room not found',
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  async findAllMovies(id: string): Promise<Movie[]> {
    const room = await this.roomModel.findOne({
      where: {
        id,
      },
      include: Movie,
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room.movies;
  }

  async addMovieToRoom(
    roomId: string,
    addMovieRoomDto: AddMovieRoomDTO,
  ): Promise<MovieRoom> {
    return this.movieRoomModel.create({
      roomId,
      movieId: addMovieRoomDto.movieId,
    });
  }

  // Find all the movies that are premiered but where not added to this room
  async findPremieredMovies(id: string): Promise<Movie[]> {
    // Find all movie IDs from the MovieRoom table where roomId is not equal to the passed id
    const movieRooms = await this.movieRoomModel.findAll({
      where: {
        roomId: id,
      },
    });

    const movieIdsInOtherRooms = movieRooms.map(
      (movieRoom) => movieRoom.movieId,
    );

    // Find all movies that were not included in the previous list
    return this.movieModel.findAll({
      where: {
        id: {
          [Op.notIn]: movieIdsInOtherRooms,
        },
        status: MOVIE_STATUS.PREMIERED,
      },
    });
  }

  // Find all the movies that are coming_soon but where not added to this room
  async findComingSoonMovies(id: string): Promise<Movie[]> {
    // Find all movie IDs from the MovieRoom table where roomId is not equal to the passed id
    const movieRooms = await this.movieRoomModel.findAll({
      where: {
        roomId: id,
      },
    });

    const movieIdsInOtherRooms = movieRooms.map(
      (movieRoom) => movieRoom.movieId,
    );

    console.log(movieIdsInOtherRooms);

    // Find all movies that were not included in the previous list
    return this.movieModel.findAll({
      where: {
        id: {
          [Op.notIn]: movieIdsInOtherRooms,
        },
        status: MOVIE_STATUS.COMING_SOON,
      },
    });
  }
}
