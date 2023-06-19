import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/schemas';
import { JwtService } from '@nestjs/jwt';
import { USER_ERROR } from 'constants/';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async user(email: string): Promise<any> {
    return await User.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.user(email);

    if(!user) {
        return { error: USER_ERROR.INVALID_USER, status: HttpStatus.CONFLICT};
    }

    if ( await user.comparePassword(password)) {
      const { password, ...result } = user.get({ plain: true });
      return result;
    }
    return { error: USER_ERROR.INVALID_PASSWORD, status: HttpStatus.CONFLICT};
  }

  async login(email: string, password: string): Promise<any> {
    const payload = { email: email, password: password };
    return await {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(email: string) {
    const payload = { email: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
