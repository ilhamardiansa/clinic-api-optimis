import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { format_json } from 'src/env';
import { Otp } from 'src/entity/otp.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  async verifikasi(kode_otp: number, token: string): Promise<{ status: boolean, message:string }> {

    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const CheckUser = await this.authRepository.findOne({ where: { id:userId } });
        if (!CheckUser) {
          return {
            status: false,
            message: 'Email tidak valid'
          };
        }

        if (CheckUser.verifed == 1) {
          return {
            status: false,
            message: 'Email telah terverifikasi'
          };
        }

        const otpExists = await this.otpRepository.findOne({ where: { kode_otp, user_id: CheckUser.id, status: 0 }, order: { id: 'DESC' } });
        if (!otpExists) {
          return {
            status: false,
            message: 'Kode OTP Tidak valid'
          };
        }

        const waktusaatini = new Date();
        const get_otp_time = otpExists.created_at;

        const check_otp_expired = Math.floor((waktusaatini.getTime() - get_otp_time.getTime()) / (1000 * 60));

        if (check_otp_expired > 5) {
          return {
            status: false,
            message: 'Kode OTP Sudah Kadarluwasa',
          };
        }

        otpExists.status = 1;
        CheckUser.verifed = 1;
        await this.otpRepository.save(otpExists);
        await this.authRepository.save(CheckUser);

        return {
          status: true,
          message: 'Akun telah berhasil di verifikasi'
        };
    } else {
      return {
        status: false,
        message: 'Invalid Payload'
      };
    }
  }

  async checkotp(kode_otp: number): Promise<{ status: boolean}> {
    const newOtp = this.otpRepository.findOne({ where: { kode_otp } });
    if(newOtp){
      return {
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  }

  async saveOtp(kode_otp: number, user_id: number, status:number): Promise<Otp> {
    const newOtp = this.otpRepository.create({ kode_otp, user_id, status });
    return this.otpRepository.save(newOtp);
  }

  async register(username: string, email: string, phone_number: string, password: string): Promise<{ username: string; status: boolean, message:string, id:number, token:string }> {

    const emailExists = await this.authRepository.findOne({ where: { email } });
    if (emailExists) {
      return {
        status: false,
        id: null,
        username: username,
        message: 'Email telah di pakai',
        token: null
      };
    }

    const phoneNumberExists = await this.authRepository.findOne({ where: { phone_number } });
    if (phoneNumberExists) {
      return {
        status: false,
        id: null,
        username: username,
        message: 'Nomor Handphone telah di pakai',
        token: null
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

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return {
      status: true,
      id: save.id,
      username: save.username,
      message: 'Berhasil',
      token: token
    };
  }

  async signIn(email: string, password: string): Promise<{ status: boolean, token:string, verifikasi:boolean, user_id: number }> {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      return {
        status: false,
        verifikasi: false,
        token: 'User tidak ditemukan',
        user_id: null
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: false,
        verifikasi: false,
        token: 'Password salah',
        user_id: null
      };
    }
    if (user.verifed == 0) {
      const token_verifikasi = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );

      return {
        status: true,
        verifikasi: false,
        token: token_verifikasi,
        user_id: user.id
      };
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    return {
      status: true,
      verifikasi: true,
      token: 'token',
      user_id: null
    };
  }
}
