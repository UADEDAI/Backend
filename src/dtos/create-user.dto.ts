import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsDate, IsNotEmpty } from 'class-validator';
import { Column } from 'sequelize-typescript';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Column({ field: 'name' })
  username?: string;

  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsNotEmpty()
  @IsEnum(['owner', 'client'])
  role?: 'owner' | 'client';

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
