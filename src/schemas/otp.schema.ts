import {
  Column,
  AutoIncrement,
  PrimaryKey,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './users.schema';

@Table
export class Otp extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  code: string;

  @ForeignKey(() => User)
  @Column
  user: number;

  @BelongsTo(() => User, { foreignKey: 'user', as: 'user_id' })
  user_id: User;
}
