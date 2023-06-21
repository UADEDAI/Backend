import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cinema, User } from 'src/schemas';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Otp } from 'src/schemas/otp.schema';
import { OtpService } from 'src/otp/otp.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Cinema, Otp])],
  controllers: [UsersController],
  providers: [UsersService, OtpService],
  exports: [UsersService],
})
export class UsersModule {}
