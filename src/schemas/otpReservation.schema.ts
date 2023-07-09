import {
  Column,
  AutoIncrement,
  PrimaryKey,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';
import { User } from './users.schema';

@Table
export class OtpReservation extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  code: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public userId: number;

  @BelongsTo(() => User)
  public user: User;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
