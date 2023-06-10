import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Movie } from './movies.schema';
import { Room } from './rooms.schema';

@Table({ tableName: 'movie_room' })
export class MovieRoom extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @ForeignKey(() => Room)
  @Column
  roomId: number;
}
