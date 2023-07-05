import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize} from 'sequelize';
import { getGeocode } from 'services/geolocation';
import { CreateCinemaDto, UpdateCinemaDto } from 'src/dtos';
import { Cinema, Movie, Room } from 'src/schemas';

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
    const { name, street, streetNum, city, state, country, neighbourhood, userId } = createCinemaDto;
  
    // Create the full address string
    const address = `${street} ${streetNum}, ${neighbourhood}, ${city}, ${state}, ${country}`;
  
    const { lat: latitude, lng: longitude } = await getGeocode(address);

    if  (!latitude || !longitude) {
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

  async findNearestCinemas(lat: number, long: number, radius: number): Promise<Cinema[]> {
    const distanceLimitDegree = radius / 111.32;  // 1 grado de latitud aprox 111.32 km
    console.log(distanceLimitDegree);
    return this.cinemaModel.findAll({
      where: Sequelize.where(
        Sequelize.literal(`POW((latitude - ${lat}),2) + POW((longitude - ${long}),2)`),
        '<=',
        Math.pow(distanceLimitDegree, 2)
      )
    });
  }
}
