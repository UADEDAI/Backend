import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { Cinema } from 'src/schemas/cinemas.schema';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneUser(id);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    console.log('Controller ', updateUserDto);
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteOne(
    @Param('id') id: string,
  ): Promise<{ message: string; statusCode: number }> {
    return this.usersService.deleteUser(id);
  }

  @Post()
  async createOne(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      console.log(createUserDto);
      const createUserResultDto = await this.usersService.create(createUserDto);
      return res.status(201).json(createUserResultDto);
    } catch (error) {
      console.error(error);
      return res
        .status(409)
        .json({ message: 'Error while creating user', error: error.message });
    }
  }

  @Get(':id/cinemas')
  findUserCinemas(@Param('id') id: string): Promise<Cinema[]> {
    return this.usersService.findUserCinemas(id);
  }
}
