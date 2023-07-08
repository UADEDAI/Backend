import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateScreeningDto } from 'src/dtos';
import { Reservation, ReservationSeat, Screening, Seat } from 'src/schemas';

@Injectable()
export class ScreeningsService {
  constructor(
    @InjectModel(Screening)
    private screeningModel: typeof Screening,
    @InjectModel(Seat)
    private seatModel: typeof Seat,
    @InjectModel(ReservationSeat)
    private reservationSeatModel: typeof ReservationSeat,
    @InjectModel(Reservation)
    private reservationModel: typeof Reservation,
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

  async findAvailableSeats(
    id: string,
    year: number,
    month: number,
    day: number,
  ): Promise<Seat[]> {
    const screening = await this.findOneScreening(id);
    // Validate that the given date is valid
    const date = new Date(year, month, day);
    // const date = new Date(year, month - 1, day);
    if (date.toString() === 'Invalid Date') {
      throw new Error('Invalid date');
    }

    const reservations = await this.reservationModel.findAll({
      where: {
        screeningId: id,
        year,
        month,
        day,
      },
    });

    const reservedSeats = await this.reservationSeatModel.findAll({
      where: {
        reservationId: reservations.map((reservation) => reservation.id),
      },
    });

    const allSeats = await this.seatModel.findAll({
      where: {
        roomId: screening.roomId,
      },
    });

    const availableSeats = allSeats.filter((seat) => {
      return !reservedSeats.some((reservedSeat) => {
        return reservedSeat.seatId === seat.id;
      });
    });

    return availableSeats;
  }
}
