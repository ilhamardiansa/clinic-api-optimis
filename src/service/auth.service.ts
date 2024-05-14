import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { format_json } from 'src/env';
import { Otp } from 'src/entity/otp.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  async verifikasi(kode_otp: number, email: string): Promise<{ status: boolean, message:string }> {

    const emailExists = await this.authRepository.findOne({ where: { email } });
    if (!emailExists) {
      return {
        status: false,
        message: 'Email tidak valid'
      };
    }

    const otpExists = await this.otpRepository.findOne({ where: { kode_otp, user_id: emailExists.id, status: 0 }, order: { id: 'DESC' } });
    if (!otpExists) {
      return {
        status: false,
        message: 'Kode OTP Tidak valid'
      };
    }

    otpExists.status = 1;
    await this.otpRepository.save(otpExists);

    return {
      status: true,
      message: 'Akun telah berhasil di verifikasi'
    };
  }

  async saveOtp(kode_otp: number, user_id: number, status:number): Promise<Otp> {
    const newOtp = this.otpRepository.create({ kode_otp, user_id, status });
    return this.otpRepository.save(newOtp);
  }

  async register(username: string, email: string, phone_number: string, password: string): Promise<{ username: string; status: boolean, message:string, id:number }> {

    const emailExists = await this.authRepository.findOne({ where: { email } });
    if (emailExists) {
      return {
        status: false,
        id: null,
        username: username,
        message: 'Email telah di pakai'
      };
    }

    const phoneNumberExists = await this.authRepository.findOne({ where: { phone_number } });
    if (phoneNumberExists) {
      return {
        status: false,
        id: null,
        username: username,
        message: 'Nomor Handphone telah di pakai'
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.authRepository.create({
      username: username,
      email: email,
      phone_number: phone_number,
      password: hashedPassword,
      role_id: 1,
      verifed: 0,
    });

    const save = await this.authRepository.save(user);
    return {
      status: true,
      id: save.id,
      username: save.username,
      message: 'Berhasil'
    };
  }
}
