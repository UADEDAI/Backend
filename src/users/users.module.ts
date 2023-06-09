import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Cinema } from 'src/schemas/cinemas.schema';

@Module({
  imports: [SequelizeModule.forFeature([User, Cinema])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
