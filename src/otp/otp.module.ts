import { Module } from '@nestjs/common';
import { Otp } from 'src/schemas/otp.schema';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schemas';

@Module({
  imports: [SequelizeModule.forFeature([Otp, User])],
  providers: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}