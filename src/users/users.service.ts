import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserResultDto } from 'src/dtos/create-user-result.dto';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';
import { User } from 'src/schemas';
import { Cinema } from 'src/schemas/cinemas.schema';
import { sendEmail } from 'services/mailer';
import { OtpService } from 'src/otp/otp.service';
import { OTP_MAIL_CONTENT } from 'constants/';


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
    private otpService: OtpService
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

    await newUser.save()
    await newUser.reload();

    const { password, ...user } = newUser.get();
    console.log(user);

    if (user.role == 'owner') {
      const otp = await this.otpService.generateOtp(user.id);
      console.log('BP1')
      sendEmail(
        user.email, 
        OTP_MAIL_CONTENT.subject, 
        OTP_MAIL_CONTENT.msg + otp.code,
        `<p>${OTP_MAIL_CONTENT.msg} <b>${otp.code}</b></p>`,
      ).catch(console.error);
      console.log('BP2')

    }
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
