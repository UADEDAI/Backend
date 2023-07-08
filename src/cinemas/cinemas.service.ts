import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { endOfDay, startOfDay } from 'date-fns';
import { Op, Sequelize } from 'sequelize';
import { getGeocode } from 'services/geolocation';
import { CreateCinemaDto, UpdateCinemaDto } from 'src/dtos';
import { Cinema, Movie, Room, Screening } from 'src/schemas';

type CinemaWithRoomsAmount = Cinema & {
  roomsAmount: number;
  moviesAmount: number;
};

@Injectable()
export class CinemasService {
  constructor(
    @InjectModel(Cinema)
    private cinemaModel: typeof Cinema,
    @InjectModel(Room)
    private roomModel: typeof Room,
    @InjectModel(Screening)
    private screeningModel: typeof Screening,
  ) {}

  async findAllCinemas(): Promise<CinemaWithRoomsAmount[]> {
    const cinemas =
      (await this.cinemaModel.findAll()) as CinemaWithRoomsAmount[];

    await Promise.all(
      cinemas.map(async (cinema) => {
        const rooms = await this.roomModel.findAll({
          where: {
            cinemaId: cinema.id,
          },
          include: Movie,
        });
        const roomsAmount = rooms.length;
        let moviesAmount = 0;
        for (const room of rooms) {
          moviesAmount += room.movies.length;
        }

        cinema.setDataValue('roomsAmount', roomsAmount);
        cinema.setDataValue('moviesAmount', moviesAmount);

        return cinema;
      }),
    );

    return cinemas;
  }

  async findOneCinema(id: string): Promise<Cinema> {
    return this.cinemaModel.findOne({
      where: {
        id,
      },
    });
  }

  async createCinema(createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    const {
      name,
      street,
      streetNum,
      city,
      state,
      country,
      neighbourhood,
      userId,
    } = createCinemaDto;

    // Create the full address string
    const address = `${street} ${streetNum}, ${neighbourhood}, ${city}, ${state}, ${country}`;

    const { lat: latitude, lng: longitude } = await getGeocode(address);

    if (!latitude || !longitude) {
      throw new ConflictException(
        'Invalid address. Please make sure you have entered the correct address.',
      );
    }

    const existingCinema = await this.cinemaModel.findOne({
      where: {
        [Op.or]: [
          { name, userId },
          { latitude, longitude },
        ],
      },
    });

    if (existingCinema) {
      throw new ConflictException(
        'A cinema with the same name and userId or exact lat and long location already exists.',
      );
    }

    const cinemaData = {
      ...createCinemaDto,
      latitude,
      longitude,
    };

    return this.cinemaModel.create(cinemaData as any);
  }

  async updateCinema(
    id: string,
    updateCinemaDto: UpdateCinemaDto,
  ): Promise<Cinema> {
    const cinema = await this.findOneCinema(id);

    await cinema.update(updateCinemaDto);
    await cinema.reload();

    return cinema;
  }

  async deleteOne(
    id: string,
  ): Promise<{ message: string; statusCode: number }> {
    const rowsAffected = await this.cinemaModel.destroy({
      where: {
        id,
      },
    });

    if (rowsAffected > 0) {
      return {
        message: `Cinema with id ${id} deleted successfully`,
        statusCode: HttpStatus.OK,
      };
    }

    return {
      message: `Cinema with id ${id} not found`,
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  async findAllRooms(id: string): Promise<Room[]> {
    return this.roomModel.findAll({
      where: {
        cinemaId: id,
      },
      include: Movie,
    });
  }

  async findNearestCinemas(
    lat: number,
    long: number,
    radius: number,
    movie: number,
  ): Promise<Cinema[]> {
    const distanceLimitDegree = radius / 111.32; // 1 degree of latitude approx 111.32 km

    // 1. Find the IDs of rooms that have screenings for this movie
    const screeningsWithMovie = await this.screeningModel.findAll({
      where: { movie_id: movie },
      attributes: ['roomId'],
      raw: true, // Returns plain JavaScript objects, not Sequelize instances
    });

    // Extract the room IDs
    const roomIdsWithMovie = screeningsWithMovie.map(
      (screening) => screening.roomId,
    );

    // 2. Find the IDs of cinemas corresponding to these rooms
    const rooms = await this.roomModel.findAll({
      where: { id: { [Op.in]: roomIdsWithMovie } },
      attributes: ['cinemaId'],
      raw: true,
    });

    // Extract the cinema IDs
    const cinemaIdsWithMovie = rooms.map((room) => room.cinemaId);

    // 3. Find cinemas within the radius that also have the movie
    const cinemasWithinRadiusWithMovie = await this.cinemaModel.findAll({
      where: {
        id: { [Op.in]: cinemaIdsWithMovie },
        [Op.and]: Sequelize.where(
          Sequelize.literal(
            `POW((latitude - ${lat}),2) + POW((longitude - ${long}),2)`,
          ),
          '<=',
          Math.pow(distanceLimitDegree, 2),
        ),
      },
    });

    return cinemasWithinRadiusWithMovie;
  }

  async findCinemaScreenings(id: string, date: string): Promise<Screening[]> {
    const rooms = this.findAllRooms(id);

    const roomsIds = (await rooms).map((room) => room.id);

    const where = {
      roomId: {
        [Op.in]: roomsIds,
      },
    };

    const dateStart = new Date(date);

    if (dateStart.toString() !== 'Invalid Date') {
      const startAt = startOfDay(dateStart);
      const endAt = endOfDay(dateStart);
      where['startAt'] = {
        [Op.between]: [startAt, endAt],
      };
    }

    return this.screeningModel.findAll({
      where,
      include: [Movie, { model: Room, include: [Cinema] }],
    });
  }
}
