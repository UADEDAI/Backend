import { Injectable } from '@nestjs/common';
import { Otp } from 'src/schemas/otp.schema';
import { randomBytes } from 'crypto';
import { InjectModel } from '@nestjs/sequelize';

export function generateRandomOtp(length: number = 6): string {
  const buffer = randomBytes(Math.ceil(length / 2));
  const otp = buffer.toString('hex').slice(0, length);
  return otp;
}

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp)
    private otpModel: typeof Otp,
  ) {}

  async generateOtp(userId: number): Promise<Otp> {
    const otp = new this.otpModel()
    otp.code = generateRandomOtp();
    otp.user = userId;

    return otp.save();
  }

  async getOtpByUser(userId: number): Promise<Otp> {
    return this.otpModel.findOne({ where: { userId } });
  }

  async getAllOtp(): Promise<Otp[]> {
    return this.otpModel.findAll();
  }

  async clearOtp(userId: number): Promise<void> {
    const otp = await this.getOtpByUser(userId);
    if (otp) {
      await otp.destroy();
    }
  }
}
