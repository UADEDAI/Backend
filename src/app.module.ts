import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { CinemasModule } from './cinemas/cinemas.module';
import { RoomsModule } from './rooms/rooms.module';
import { ScreeningsModule } from './screenings/screenings.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [__dirname + '/**/*.model{.ts,.js}'],
      autoLoadModels: true,
      synchronize: true,
      define: {
        underscored: true,
        freezeTableName: false,
        timestamps: true,
      },
    }),
    MoviesModule,
    UsersModule,
    CinemasModule,
    RoomsModule,
    ScreeningsModule,
    AuthModule,
    OtpModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
