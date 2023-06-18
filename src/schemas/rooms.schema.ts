import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Cinema } from './cinemas.schema';
import { MovieRoom } from './movieRoom.schema';
import { Movie } from './movies.schema';
import { Screening } from './screenings.schema';

@Table
export class Room extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Cinema)
  @Column({
    field: 'cinema_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  cinemaId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    field: 'num_rows',
    type: DataType.INTEGER,
    allowNull: false,
  })
  numRows: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  seats: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  enabled: boolean;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => Cinema)
  cinema: Cinema;

  @BelongsToMany(() => Movie, () => MovieRoom)
  movies: Movie[];

  @HasMany(() => Screening)
  screenings: Screening[];
}
