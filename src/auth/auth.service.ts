import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/schemas';
import { JwtService } from '@nestjs/jwt';
import { OTP_ERROR, PASSWORD_MAIL_CONTENT, USER_ERROR } from 'constants/';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from 'src/schemas/otp.schema';
import { generateRandomOtp } from 'src/otp/otp.service';
import { sendEmail } from 'services/mailer';
import * as admin from 'firebase-admin';
import { CreateCinemaDto } from 'src/dtos';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Otp)
    private otpModel: typeof Otp,
  ) {}

  async user(email: string): Promise<any> {
    return await User.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await this.user(email);

    if(!user) {
      return { error: USER_ERROR.INVALID_USER, status: HttpStatus.CONFLICT};
    }

    if(!user.verified) {
      return { error: USER_ERROR.UNVERIFIED_USER, status: HttpStatus.CONFLICT};
    }

    if ( await user.comparePassword(password)) {
      const { password, ...result } = user.get({ plain: true });
      return result;
    }
    return { error: USER_ERROR.INVALID_PASSWORD, status: HttpStatus.CONFLICT};
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.user(email);
    const payload = { email: email, id: user.id };
    return await {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return { error: USER_ERROR.INVALID_USER, status: HttpStatus.CONFLICT};
    }
    const payload = { email: email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      return { error: USER_ERROR.INVALID_USER, status: HttpStatus.CONFLICT};
    }
    const otp = new this.otpModel()
    otp.code = generateRandomOtp();
    otp.user = user.id;

    sendEmail(
      user.email, 
      PASSWORD_MAIL_CONTENT.subject, 
      PASSWORD_MAIL_CONTENT.msg + otp.code, 
      `<p>${PASSWORD_MAIL_CONTENT.msg} <b>${otp.code}</b></p>`,
    ).catch(console.error);

    await otp.save();
    await otp.reload();

    const { code, ...response } = otp.get();
    return response;
  }

  async recoverPassword(password: string, code: string) {
    const otp = await this.otpModel.findOne({ where: { code } });
    if (!otp) {
        return { error: OTP_ERROR.INVALID_OTP, status: HttpStatus.CONFLICT};
    }    
    const user = await this.userModel.findOne({ where: { id: otp.user } });
    if (!user) {
      return { error: USER_ERROR.INVALID_USER, status: HttpStatus.CONFLICT};
    }

    user.password = password;

    await user.save();
    await otp.destroy();

    return user;
  }

  async validateOtp(userId: number, code: string) {
    const otp = await this.otpModel.findOne({ where: { user: userId } });
    if (!otp) {
      return { error: OTP_ERROR.INVALID_OTP, status: HttpStatus.CONFLICT};
    }
    const isValid = otp.code === code;

    if(isValid){
      await otp.destroy();
      const user = await this.userModel.findOne({ where: { id: userId } });
      const payload = { email: user.email, id: user.id };
      user.verified = true;
      await user.save();
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return isValid;
  }

  async verifyFirebaseToken(idToken) {
    // Initialize Firebase Admin SDK
    const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    
    console.log('firebasePrivateKey: ' + firebasePrivateKey);
    console.log('projectId: ' + projectId);
    console.log('clientEmail: ' + clientEmail);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
        }),
      });
    }
    console.log('LOG: ' + idToken);
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token: ' + error.message);
    }
  }
  
  async createGoogleUser(email: string): Promise<any> {
    return this.userModel.create({
      email: email,
      verified: true,
      role: 'client',
      password: 'default',
    });
  }
}

