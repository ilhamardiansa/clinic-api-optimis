import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { SignInDto } from 'src/dto/auth/signin.dto';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';
import { format_json } from 'src/env';
import { AuthService } from 'src/service/auth.service';
import { mailService } from 'src/service/mailer/mailer.service';

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
        const sendemail = this.mailService.sendMail(email, 'Verifikasi email', `Kode verifikasi akun anda : ${code}`);
        const savecode = await this.authService.saveOtp(code, user.id, 0);
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
      return format_json(true, false, null, "User signed up successfully", token);
    } else {
      const code = generateRandomNumber(100000, 999999);
      const sendemail = this.mailService.sendMail(email, 'Verifikasi email', `Kode verifikasi akun anda : ${code}`);
      const savecode = await this.authService.saveOtp(code, token.user_id, 0);
      return format_json(true, false, null, "Silakan verifikasi email anda", token);
    }
  }


  @Post('auth/verifikasi')
  async verifikasiEmail(@Body() verifikasiDTO: VerifikasiDTO) {
    try {
      const { kode_otp, email } = verifikasiDTO;
      const verifikasiotp = await this.authService.verifikasi(kode_otp, email);
      if(verifikasiotp.status == true){
        return format_json(true, null, null, "User signed up successfully", { user: verifikasiotp });
      } else {
        return format_json(false, null, null,verifikasiotp.message, null);
      }
    } catch (error) {
      return format_json(false, true, null,"Server Error", error);
    }
  }
}