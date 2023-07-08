import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Seat } from './seats.schema';
import { Reservation } from './reservations.schema';

@Table({
  tableName: 'reservation_seats',
  timestamps: false,
})
export class ReservationSeat extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => Reservation)
  @Column({
    field: 'reservation_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  public reservationId: number;

  @BelongsTo(() => Reservation)
  public reservation: Reservation;

  @ForeignKey(() => Seat)
  @Column({
    field: 'seat_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  public seatId: number;

  @BelongsTo(() => Seat)
  public seat: Seat;
}
