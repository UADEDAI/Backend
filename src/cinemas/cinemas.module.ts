import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cinema, Room, User } from 'src/schemas';
import { CinemasController } from './cinemas.controller';
import { CinemasService } from './cinemas.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Cinema, Room])],
  controllers: [CinemasController],
  providers: [CinemasService],
  exports: [CinemasService],
})
export class CinemasModule {}
