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
import { User } from './users.schema';
import { OtpReservation } from './otpReservation.schema';

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public userId: number;

  @BelongsTo(() => User)
  public user: User;

  @ForeignKey(() => OtpReservation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public otpId: number;

  @BelongsTo(() => OtpReservation)
  public otp: OtpReservation;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public time: Date;

  // Add other reservation-related columns as needed

  @HasMany(() => ReservationSeat)
  public reservationSeats: ReservationSeat[];
}
