import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MOVIE_STATUS, TimeAvailable } from '../../constants';
import { AddMovieRoomDTO, CreateRoomDto, UpdateRoomDto } from 'src/dtos';
import { Movie, MovieRoom, Room, Screening } from 'src/schemas';
import { Op } from 'sequelize';
import { getIncludedModels } from 'helpers';
import { addMinutes, differenceInMinutes, format, parse } from 'date-fns';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room)
    private roomModel: typeof Room,
    @InjectModel(Movie)
    private movieModel: typeof Movie,
    @InjectModel(MovieRoom)
    private movieRoomModel: typeof MovieRoom,
    @InjectModel(Screening)
    private screeningModel: typeof Screening,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomModel.findAll();
  }

  async findOne(id: string, includes?: string): Promise<Room> {
    let includedModels = [];
    if (includes) {
      includedModels = getIncludedModels(includes);
    }
    const room = await this.roomModel.findOne({
      where: {
        id,
      },
      include: includedModels,
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
        status: MOVIE_STATUS.SHOWING,
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

  // Find all the available times for a screening in a room
  async findAvailableTimes(id: string, duration: string): Promise<string[]> {
    const roomScreenings = await this.screeningModel.findAll({
      where: {
        roomId: id,
      },
      order: [['startAt', 'ASC']],
    });

    const availableTimes: string[] = [];
    const screeningDuration = parseInt(duration, 10);
    const takenTimes: TimeAvailable[] = [];

    // Loop through all the screenings and find the available times
    for (const screening of roomScreenings) {
      takenTimes.push({
        startAt: format(screening.startAt, 'HH:mm'),
        endAt: format(screening.endAt, 'HH:mm'),
      });
    }

    // Find the available times based on taken times, duration, and intervals
    let startTime = parse('00:00', 'HH:mm', new Date()); // Set initial start time as 00:00

    while (startTime < parse('23:59', 'HH:mm', new Date())) {
      const endTime = addMinutes(startTime, screeningDuration);
      const endTimeString = format(endTime, 'HH:mm');

      // Check if the time slot falls within any taken times
      const isTimeTaken = takenTimes.some((takenTime) => {
        const takenStart = parse(takenTime.startAt, 'HH:mm', new Date());
        const takenEnd = parse(takenTime.endAt, 'HH:mm', new Date());
        return (
          (startTime >= takenStart && startTime < takenEnd) ||
          (endTime > takenStart && endTime <= takenEnd)
        );
      });

      // Check if there is enough time after the current start time for the specified duration and it's not taken
      if (endTimeString <= '23:59' && !isTimeTaken) {
        availableTimes.push(format(startTime, 'HH:mm'));
      }

      startTime = addMinutes(startTime, 15); // Increment start time by 15 minutes
    }

    return availableTimes;
  }
}
