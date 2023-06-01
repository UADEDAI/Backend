import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

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

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
