import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { SignInDto } from 'src/dto/auth/signin.dto';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';
import { format_json } from 'src/env';
import { AuthService } from 'src/service/auth.service';
import { mailService } from 'src/service/mailer/mailer.service';
import { AuthGuard } from '@nestjs/passport';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: mailService
  ) {}

  @Post('auth/register')
  async register(@Body() authDTO: AuthDTO) {
    try {
      const { username, email, phone_number, password } = authDTO;
      const user = await this.authService.register(username, email, phone_number, password);
      if(user.status == true){
        const code = generateRandomNumber(100000, 999999);
        const checkotp = this.authService.checkotp(code)
        let otp;
        if(checkotp){
          otp = code;
        } else {
          otp = generateRandomNumber(100000, 999999);
        }
        const sendemail = this.mailService.sendMail(email, 'Verifikasi email', otp, username);
        const saveotp = await this.authService.saveOtp(otp, user.id, 0);
        return format_json(true, false, null, "User signed up successfully", { user: user });
      } else {
        return format_json(false, true, null,user.message, null);
      }
    } catch (error) {
      return format_json(false, true, null,"Server Error", error);
    }
  }

  @Post('auth/signin')
  async signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    const token = await this.authService.signIn(email, password);
    if(token.verifikasi == true) {
      return format_json(true, false, null, "User signed in successfully", token);
    } else {
      const code = generateRandomNumber(100000, 999999);
        const checkotp = this.authService.checkotp(code)
        let otp;
        if(checkotp){
          otp = code;
        } else {
          otp = generateRandomNumber(100000, 999999);
        }
      const sendemail = this.mailService.sendMail(email, 'Verifikasi email', otp, token.username);
      const saveotp = await this.authService.saveOtp(otp, token.user_id, 0);
      return format_json(true, false, null, "Silakan verifikasi email anda", token);
    }
  }


  @Post('auth/verification')
  @UseGuards(AuthGuard('jwt'))
  async verifikasiEmail(@Body() verifikasiDTO: VerifikasiDTO, @Req() req: Request) {
    try {
      const { kode_otp } = verifikasiDTO;
      const authorizationHeader = req.headers['authorization']; 

    if (!authorizationHeader) {
      return format_json(false, null, null, "Authorization header is missing", null);
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return format_json(false, null, null, "Bearer token is missing", null);
    }
      const verifikasiotp = await this.authService.verifikasi(kode_otp, token);
      if(verifikasiotp.status == true){
        return format_json(true, null, null, verifikasiotp.message, { user: verifikasiotp });
      } else {
        return format_json(false, null, null,verifikasiotp.message, null);
      }
    } catch (error) {
      return format_json(false, true, null,"Server Error", error);
    }
  }

  @Post('auth/resend')
  @UseGuards(AuthGuard('jwt'))
  async resendOTP(@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization']; 

    if (!authorizationHeader) {
      return format_json(false, null, null, "Authorization header is missing", null);
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
      return format_json(false, null, null, "Bearer token is missing", null);
    }

      const code = generateRandomNumber(100000, 999999);
        const checkotp = this.authService.checkotp(code)
        let otp;
        if(checkotp){
          otp = code;
        } else {
          otp = generateRandomNumber(100000, 999999);
        }

      const resendotp = await this.authService.resendotp(token, otp);
      if(resendotp.status == true){
        return format_json(true, null, null, resendotp.message, { user: resendotp });
      } else {
        return format_json(false, null, null,resendotp.message, null);
      }
    } catch (error) {
      return format_json(false, true, null,"Server Error", error);
    }
  }
}