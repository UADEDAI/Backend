import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  HasMany,
  HasOne,
  Unique,
} from 'sequelize-typescript';
import { Cinema } from './cinemas.schema';
import { Otp } from './otp.schema';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    field: 'name',
    allowNull: false,
  })
  username: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  company: string;

  @Column({
    type: DataType.ENUM,
    values: ['owner', 'client'],
    allowNull: true,
  })
  role: 'owner' | 'client';

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;

  @HasMany(() => Cinema)
  cinemas: Cinema[];

  @HasOne(() => Otp)
  otp: Otp;

  @Column({ field: 'verified', type: DataType.BOOLEAN })
  verified: boolean;

  async comparePassword(passwordAttempt: string): Promise<boolean> {
    //return await bcrypt.compare(passwordAttempt, this.password);
    return this.password === passwordAttempt;
  }
}
