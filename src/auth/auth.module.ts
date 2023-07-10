import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/schemas';
import { AuthController } from './auth.controller';
import { Otp } from 'src/schemas/otp.schema';
require('dotenv').config();

@Module({
  imports: [
    SequelizeModule.forFeature([User, Otp]),
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
