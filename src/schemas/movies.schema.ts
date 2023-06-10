import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Room } from './rooms.schema';
import { MovieRoom } from './movieRoom.schema';

@Table
export class Movie extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column
  duration: number;

  @Column
  releaseDate: Date;

  @Column
  genre: string;

  @Column
  director: string;

  @Column(DataType.TEXT)
  cast: string;

  @Column
  score: number;

  @Column
  certificate: string;

  @Column(DataType.TEXT)
  imageUrl: string;

  @Column({
    type: DataType.ENUM,
    values: ['premiered', 'coming_soon'],
    allowNull: true,
  })
  status: 'premiered' | 'coming_soon';

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  @BelongsToMany(() => Room, () => MovieRoom)
  rooms: Room[];
}
