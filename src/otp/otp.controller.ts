import { Controller, UseGuards, Post, Request, Body, Get } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Otp } from 'src/schemas/otp.schema';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Get()
  async findAll(): Promise<Otp[]> {
    return this.otpService.getAllOtp();
  }
}