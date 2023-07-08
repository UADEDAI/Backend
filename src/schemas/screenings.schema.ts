import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
  UpdatedAt,
  Model,
  BelongsTo,
} from 'sequelize-typescript';
import { Movie } from './movies.schema';
import { Room } from './rooms.schema';

@Table
export class Screening extends Model {
  @PrimaryKey
  @Column
  id: number;

  @ForeignKey(() => Movie)
  @Column({ field: 'movie_id', type: DataType.INTEGER })
  movieId: number;

  @ForeignKey(() => Room)
  @Column({ field: 'room_id', type: DataType.INTEGER })
  roomId: number;

  @Column
  format: string;

  @Column({ field: 'start_at', type: DataType.DATE })
  startAt: Date;

  @Column({ field: 'end_at', type: DataType.DATE })
  endAt: Date;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  @BelongsTo(() => Room)
  room: Room;

  @BelongsTo(() => Movie)
  movie: Movie;
}
