import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { User } from 'src/schemas';
import { Cinema } from 'src/schemas/cinemas.schema';

//
// Constants
//
const attributes = [
  'id',
  'email',
  'name',
  'company',
  'role',
  'createdAt',
  'updatedAt',
];

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Cinema)
    private cinemaModel: typeof Cinema,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.findAll({ attributes });
  }

  async findOneUser(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
      attributes,
    });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneUser(id);

    await user.update(updateUserDto);
    await user.reload();

    // Exclude the password field from the returned user object
    const { password, ...updatedUser } = user.get();

    return updatedUser as User;
  }

  async deleteUser(
    id: string,
  ): Promise<{ message: string; statusCode: number }> {
    const rowsAffected = await this.userModel.destroy({
      where: {
        id,
      },
    });

    if (rowsAffected > 0) {
      return {
        message: `User with id ${id} deleted successfully`,
        statusCode: HttpStatus.OK,
      };
    }

    return {
      message: `User with id ${id} not found`,
      statusCode: HttpStatus.NOT_FOUND,
    };
  }

  async findUserCinemas(id: string): Promise<Cinema[]> {
    return this.cinemaModel.findAll({
      where: {
        userId: id,
      },
    });
  }
}
