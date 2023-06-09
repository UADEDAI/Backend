import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  Unique,
  HasMany,
} from 'sequelize-typescript';
import { User } from './users.schema';
import { Room } from './rooms.schema';

@Table
export class Cinema extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Unique('user_cinema_unique')
  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street: string;

  @Column({
    field: 'street_num',
    type: DataType.INTEGER,
    allowNull: false,
  })
  streetNum: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  neighbourhood: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  latitude: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  longitude: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.ENUM,
    values: ['0', '1'],
    allowNull: true,
  })
  enabled: '0' | '1';

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Room)
  rooms: Room[];

  // Virtual Fields
  @Column({ type: DataType.VIRTUAL })
  roomsAmount: number;

  @Column({ type: DataType.VIRTUAL })
  moviesAmount: number;
}
