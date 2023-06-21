import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.jwt.guard';
import { LocalAuthGuard } from './auth.local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req) {
    return this.authService.login(req.email, req.password);
  }

//  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Request() req) {
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
