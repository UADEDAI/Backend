import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Room } from './rooms.schema';

@Table({
  tableName: 'seats',
  timestamps: true,
})
export class Seat extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => Room)
  @Column({
    field: 'room_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  public roomId: number;

  @BelongsTo(() => Room)
  public room: Room;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public row: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  public number: number;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;
}
