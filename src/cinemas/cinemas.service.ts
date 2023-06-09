import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateCinemaDto, UpdateCinemaDto } from 'src/dtos';
import { Cinema, Room } from 'src/schemas';

@Injectable()
export class CinemasService {
  constructor(
    @InjectModel(Cinema)
    private cinemaModel: typeof Cinema,
    @InjectModel(Room)
    private roomModel: typeof Room,
  ) {}

  async findAllCinemas(): Promise<Cinema[]> {
    return this.cinemaModel.findAll();
  }

  async findOneCinema(id: string): Promise<Cinema> {
    return this.cinemaModel.findOne({
      where: {
        id,
      },
    });
  }

  async createCinema(createCinemaDto: CreateCinemaDto): Promise<Cinema> {
    const { name, latitude, longitude, userId } = createCinemaDto;

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
    return this.cinemaModel.create(createCinemaDto as any);
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
    });
  }
}
