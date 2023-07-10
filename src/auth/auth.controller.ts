import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.jwt.guard';
import { LocalAuthGuard } from './auth.local.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req) {
    return this.authService.login(req.email, req.password);
  }

  @Post('google')
  async googleAuth(@Body('token') token: string) {
    const validToken = await this.authService.verifyFirebaseToken(token);

    if(!validToken) {
      return { error: 'Invalid token' };  
    }

    const email = validToken.email;
    const thisUser = await this.authService.user(email);

    if(thisUser) {
      return this.authService.refreshToken(email);
    }

    if(!thisUser) {
      const newUser = await this.authService.createGoogleUser(email);
      if(newUser) {
        return this.authService.refreshToken(email);
      }
    }
  }

  @Post('refresh')
  async refresh(@Body() req) {
    return this.authService.refreshToken(req.email);
  }

//  @UseGuards(JwtAuthGuard)
  @Post('reset')
  async reset(@Body() req) {
    return this.authService.resetPassword(req.email);
  }

//  @UseGuards(JwtAuthGuard)
  @Post('recover')
  async recover(@Body() req) {
    return this.authService.recoverPassword(req.password, req.code);
  }

//  @UseGuards(JwtAuthGuard)
  @Post('validate')
  async validate(@Body() req) {
    return this.authService.validateOtp(req.userId, req.code);
  }
}
