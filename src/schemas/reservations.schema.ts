import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Screening } from './screenings.schema';
import { ReservationSeat } from './reservationSeats.schema';

@Table({
  tableName: 'reservations',
  timestamps: true,
})
export class Reservation extends Model<Reservation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => Screening)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public screeningId: number;

  @BelongsTo(() => Screening)
  public screening: Screening;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public year: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public month: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public day: number;

  // Add other reservation-related columns as needed

  @HasMany(() => ReservationSeat)
  public reservationSeats: ReservationSeat[];
}
