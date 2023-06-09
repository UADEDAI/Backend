import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { Cinema } from 'src/schemas/cinemas.schema';

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

  @Get(':id/cinemas')
  findUserCinemas(@Param('id') id: string): Promise<Cinema[]> {
    return this.usersService.findUserCinemas(id);
  }
}
