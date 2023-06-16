import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateScreeningDto } from 'src/dtos';
import { Screening } from 'src/schemas';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectModel(Screening)
    private screeningModel: typeof Screening,
  ) {}

  async findAllScreenings(): Promise<Screening[]> {
    return this.screeningModel.findAll();
  }

  async createScreening(
    createScreeningDto: CreateScreeningDto,
  ): Promise<Screening> {
    // Convert the CreateScreeningDto class instance to a plain object
    const createScreeningObject = JSON.parse(
      JSON.stringify(createScreeningDto),
    );
    // Check for an existing screening with the same roomId between the given start and end dates
    const existingScreening = await this.screeningModel.findOne({
      where: {
        roomId: createScreeningObject.roomId,
        startAt: {
          [Op.between]: [
            createScreeningObject.startAt,
            createScreeningObject.endAt,
          ],
        },
        endAt: {
          [Op.between]: [
            createScreeningObject.startAt,
            createScreeningObject.endAt,
          ],
        },
      },
    });

    console.log('aca', existingScreening);

    if (existingScreening) {
      throw new ConflictException(
        `A screening already exists at this time for the room with id ${createScreeningObject.roomId}.`,
      );
    }

    return this.screeningModel.create(createScreeningObject);
  }

  async findOneScreening(id: string): Promise<Screening> {
    return this.screeningModel.findOne({
      where: {
        id,
      },
    });
  }

  async deleteScreening(
    id: string,
  ): Promise<{ message: string; statusCode: number }> {
    const rowsAffected = await this.screeningModel.destroy({
      where: {
        id,
      },
    });

    if (rowsAffected > 0) {
      return {
        message: `Screening with id ${id} was deleted successfully.`,
        statusCode: HttpStatus.OK,
      };
    } else {
      return {
        message: `No screening with id ${id} was found.`,
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
  }
}
