import { Exclude } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsDate } from 'class-validator';
import { Column } from 'sequelize-typescript';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Column({ field: 'name' })
  username?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @Exclude()
  password?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsEnum(['owner', 'client'])
  role?: 'owner' | 'client';

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
