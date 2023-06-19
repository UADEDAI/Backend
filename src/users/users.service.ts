import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserResultDto } from 'src/dtos/create-user-result.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { User } from 'src/schemas';
import { Cinema } from 'src/schemas/cinemas.schema';
import { sendEmail } from 'services/mailer';


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

  findUserByEmail(email: string) {
    return this.userModel.findOne({
      where: {
        email,
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

  async create(createUserDto: CreateUserDto): Promise<CreateUserResultDto> {

    const userExists = await this.findUserByEmail(createUserDto.email);
    if (userExists) {
      return {
        error: `User with email ${createUserDto.email} already exists`,
        status: HttpStatus.CONFLICT,
      };
    }

    const newUser = new this.userModel();
    //const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    if (createUserDto.company){
      newUser.company = createUserDto.company;
    }
    newUser.role = createUserDto.role;

    if (newUser.role == 'owner') {

      sendEmail('nicolasbertillod@gmail.com','hello','hello', '<>hello</>').catch(console.error);
    }

    newUser.save()
    //newUser.reload();
    const { password, ...user } = newUser.get();
    return user as CreateUserResultDto;
  }

  async findUserCinemas(id: string): Promise<Cinema[]> {
    return this.cinemaModel.findAll({
      where: {
        userId: id,
      },
    });
  }
}
