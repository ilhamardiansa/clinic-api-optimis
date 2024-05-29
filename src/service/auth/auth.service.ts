import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/profile/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { format_json } from 'src/env';
import { Otp } from 'src/entity/otp.entity';
import * as jwt from 'jsonwebtoken';
import { mailService } from '../mailer/mailer.service';
import * as moment from 'moment-timezone';
import { Profile } from '../../entity/profile/profile.entity';
import { promises } from 'dns';
import { UserService } from '../user.service';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly mailService: mailService,
  ) {}

  async resendotp(
    token: string,
    otp: number,
  ): Promise<{ status: boolean; message: string; users: any }> {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const CheckUser = await this.authRepository.findOne({
        where: { id: userId },
      });

      if (!CheckUser) {
        return {
          status: false,
          message: 'Email tidak valid',
          users: {
            full_name: null,
            image: null,
            email: CheckUser.email,
            phone_number: CheckUser.phone_number,
            token: null,
          },
        };
      }

      const get_profile = await this.profileRepository.findOne({
        where: { user_id: CheckUser.id },
      });

      if (CheckUser.verifed == 1) {
        return {
          status: false,
          message: 'Email telah terverifikasi',
          users: {
            full_name: get_profile.fullname,
            image: get_profile.profil_image,
            email: CheckUser.email,
            phone_number: CheckUser.phone_number,
            token: null,
          },
        };
      }

      const sendemail = this.mailService.sendMail(
        CheckUser.email,
        'Verifikasi email',
        otp,
        get_profile.fullname,
      );
      const saveotp = await this.saveOtp(otp, CheckUser.id, 0);

      return {
        status: false,
        message: 'Berhasil mengirim ulang Kode OTP',
        users: {
          full_name: get_profile.fullname,
          image: get_profile.profil_image,
          email: CheckUser.email,
          phone_number: CheckUser.phone_number,
          token: null,
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid Payload',
        users: {
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }
  }

  async verifikasi(
    kode_otp: number,
    token: string,
  ): Promise<{ status: boolean; message: string; users: any }> {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const CheckUser = await this.authRepository.findOne({
        where: { id: userId },
      });
      if (!CheckUser) {
        return {
          status: false,
          message: 'Email tidak valid',
          users: {
            full_name: null,
            image: null,
            email: CheckUser.email,
            phone_number: CheckUser.phone_number,
            token: null,
          },
        };
      }

      const profile = await this.profileRepository.findOne({
        where: { user_id: CheckUser.id },
      });

      if (CheckUser.verifed == 1) {
        return {
          status: false,
          message: 'Akun telah di verifikasi',
          users: {
            full_name: profile.fullname,
            image: profile.profil_image,
            email: CheckUser.email,
            phone_number: CheckUser.phone_number,
            token: null,
          },
        };
      }

      const otpExists = await this.otpRepository.findOne({
        where: { kode_otp, user_id: CheckUser.id, status: 0 },
      });
      if (!otpExists) {
        return {
          status: false,
          message: 'OTP Salah',
          users: {
            full_name: profile.fullname,
            image: profile.profil_image,
            email: CheckUser.email,
            phone_number: CheckUser.phone_number,
            token: null,
          },
        };
      }

      otpExists.status = 1;
      CheckUser.verifed = 1;
      await this.otpRepository.save(otpExists);
      await this.authRepository.save(CheckUser);

      const token = jwt.sign(
        { userId: CheckUser.id, verifikasi: true },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      );

      return {
        status: true,
        message: 'Akun telah berhasil di verifikasi',
        users: {
          full_name: profile.fullname,
          image: profile.profil_image,
          email: CheckUser.email,
          phone_number: CheckUser.phone_number,
          token: token,
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid payload',
        users: {
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }
  }

  async checkotp(kode_otp: number): Promise<{ status: boolean }> {
    const newOtp = this.otpRepository.findOne({ where: { kode_otp } });
    if (newOtp) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
      };
    }
  }

  async saveOtp(
    kode_otp: number,
    user_id: number,
    status: number,
  ): Promise<Otp> {
    const newOtp = this.otpRepository.create({ kode_otp, user_id, status });
    return this.otpRepository.save(newOtp);
  }

  async register(
    fullnames: string,
    email: string,
    phone_number: string,
    password: string,
  ): Promise<{
    status: boolean;
    message: string;
    users: any;
  }> {
    const emailExists = await this.authRepository.findOne({ where: { email } });
    if (emailExists) {
      return {
        status: false,
        message: 'Email telah di pakai',
        users: {
          id: null,
          full_name: fullnames,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }

    const phoneNumberExists = await this.authRepository.findOne({
      where: { phone_number },
    });
    if (phoneNumberExists) {
      return {
        status: false,
        message: 'Nomor handphone telah dipakai',
        users: {
          id: null,
          full_name: fullnames,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.authRepository.create({
      email: email,
      phone_number: phone_number,
      password: hashedPassword,
      role_id: 1,
      verifed: 0,
    });

    const save = await this.authRepository.save(user);

    const profile = this.profileRepository.create({
      fullname: fullnames,
      phone_number: phone_number,
      profil_image:
        'https://api.dicebear.com/8.x/adventurer/svg?seed=' + fullnames,
      no_identity: null,
      birth_date: null,
      birth_place: null,
      address: null,
      gender: null,
      work_in: null,
      blood_type: null,
      marital_status: null,
      nationality: null,
      religion: null,
      user_id: save.id,
      country_id: null,
      region_id: null,
      city_id: null,
      district_id: null,
      village_id: null,
      neighborhood_no: null,
      citizen_no: null,
      area_code: null,
    });

    const saveprofile = await this.profileRepository.save(profile);

    const token = jwt.sign(
      { userId: user.id, verifikasi: false },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
    return {
      status: true,
      message: 'Berhasil',
      users: {
        id: save.id,
        full_name: saveprofile.fullname,
        image: saveprofile.profil_image,
        email: save.email,
        phone_number: save.phone_number,
        token: token,
      },
    };
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{
    status: boolean;
    message: string;
    users: any;
  }> {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) {
      return {
        status: false,
        message: 'User tidak ditemukan',
        users: {
          id: null,
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          verifikasi: false,
          token: null,
        },
      };
    }

    const profile = await this.profileRepository.findOne({
      where: { user_id: user.id },
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: false,
        message: 'Password salah',
        users: {
          id: null,
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          verifikasi: false,
          token: null,
        },
      };
    }
    if (user.verifed == 0) {
      const token_verifikasi = jwt.sign(
        { userId: user.id, verifikasi: false },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );

      return {
        status: true,
        message: 'Silakan verifikasi akun anda',
        users: {
          id: user.id,
          full_name: profile.fullname,
          image: profile.profil_image,
          email: user.email,
          phone_number: user.phone_number,
          verifikasi: false,
          token: token_verifikasi,
        },
      };
    }

    const token = jwt.sign(
      { userId: user.id, verifikasi: true },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );
    return {
      status: true,
      message: 'Berhasil login',
      users: {
        id: user.id,
        full_name: profile.fullname,
        image: profile.profil_image,
        email: user.email,
        phone_number: user.phone_number,
        verifikasi: true,
        token: token,
      },
    };
  }

  async update_profile(
    token: string,
    updateProfile: Partial<Profile>,
  ): Promise<{ status: boolean; message: string; users: any }> {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof extracttoken !== 'string' &&
      'userId' in extracttoken &&
      'verifikasi' in extracttoken
    ) {
      const userId = extracttoken.userId;
      const userVerifikasi = extracttoken.verifikasi;

      if (userVerifikasi == false) {
        return {
          status: false,
          message: 'Silakan verifikasi akun anda',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const CheckUser = await this.authRepository.findOne({
        where: { id: userId },
      });
      if (!CheckUser) {
        return {
          status: false,
          message: 'User tidak di temukan',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const checkprofile = await this.profileRepository.findOne({
        where: { user_id: CheckUser.id },
      });

      Object.assign(checkprofile, updateProfile);

      await this.profileRepository.save(checkprofile);

      return {
        status: true,
        message: 'Data profiles berhasil di ubah',
        users: {
          id: CheckUser.id,
          full_name: checkprofile.fullname,
          image: checkprofile.profil_image,
          email: CheckUser.email,
          phone_number: CheckUser.phone_number,
          token: null,
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid Payload',
        users: {
          id: null,
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }
  }

  async update_avatar(
    token: string,
    image: string,
  ): Promise<{ status: boolean; message: string; users: any }> {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof extracttoken !== 'string' &&
      'userId' in extracttoken &&
      'verifikasi' in extracttoken
    ) {
      const userId = extracttoken.userId;
      const userVerifikasi = extracttoken.verifikasi;

      if (userVerifikasi == false) {
        return {
          status: false,
          message: 'Silakan verifikasi akun anda',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const CheckUser = await this.authRepository.findOne({
        where: { id: userId },
      });
      if (!CheckUser) {
        return {
          status: false,
          message: 'User tidak di temukan',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const checkprofile = await this.profileRepository.findOne({
        where: { user_id: CheckUser.id },
      });

      checkprofile.profil_image = image;

      await this.profileRepository.save(checkprofile);

      return {
        status: true,
        message: 'Avatar berhasil di ubah',
        users: {
          id: CheckUser.id,
          full_name: checkprofile.fullname,
          image: checkprofile.profil_image,
          email: CheckUser.email,
          phone_number: CheckUser.phone_number,
          token: null,
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid Payload',
        users: {
          id: null,
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }
  }

  async profile(
    token: string,
  ): Promise<{ status: boolean; message: string; users: any }> {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof extracttoken !== 'string' &&
      'userId' in extracttoken &&
      'verifikasi' in extracttoken
    ) {
      const userId = extracttoken.userId;
      const userVerifikasi = extracttoken.verifikasi;

      if (userVerifikasi == false) {
        return {
          status: false,
          message: 'Silakan verifikasi akun anda',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const CheckUser = await this.authRepository.findOne({
        where: { id: userId },
      });
      if (!CheckUser) {
        return {
          status: false,
          message: 'User tidak di temukan',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const checkprofile = await this.profileRepository.findOne({
        where: { user_id: CheckUser.id },
      });

      return {
        status: true,
        message: 'Data profiles berhasil di ambil',
        users: {
          id: CheckUser.id,
          full_name: checkprofile.fullname,
          image: checkprofile.profil_image,
          email: CheckUser.email,
          phone_number: CheckUser.phone_number,
          token: null,
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid Payload',
        users: {
          id: null,
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }
  }

  async change_pass(
    token: string,
    password: string,
  ): Promise<{ status: boolean; message: string; users: any }> {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof extracttoken !== 'string' &&
      'userId' in extracttoken &&
      'verifikasi' in extracttoken
    ) {
      const userId = extracttoken.userId;
      const userVerifikasi = extracttoken.verifikasi;

      if (userVerifikasi == false) {
        return {
          status: false,
          message: 'Silakan verifikasi akun anda',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const CheckUser = await this.authRepository.findOne({
        where: { id: userId },
      });
      if (!CheckUser) {
        return {
          status: false,
          message: 'User tidak di temukan',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            token: null,
          },
        };
      }

      const checkprofile = await this.profileRepository.findOne({
        where: { user_id: CheckUser.id },
      });

      const isPasswordValid = await bcrypt.compare(
        password,
        CheckUser.password,
      );

      if (isPasswordValid) {
        return {
          status: false,
          message: 'Kata sandi sama seperti yang lama',
          users: {
            id: CheckUser.id,
            full_name: checkprofile.fullname,
            image: checkprofile.profil_image,
            email: CheckUser.email,
            phone_number: CheckUser.phone_number,
            token: null,
          },
        };
      }

      const newpassword = await bcrypt.hash(password, 10);
      CheckUser.password = newpassword;
      await this.authRepository.save(CheckUser);

      return {
        status: true,
        message: 'Berhasil ubah kata sandi',
        users: {
          id: null,
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid Payload',
        users: {
          id: null,
          full_name: null,
          image: null,
          email: null,
          phone_number: null,
          token: null,
        },
      };
    }
  }

  async validateUser(payload: any): Promise<User | null> {
    const user: User | null = await UserService.findById(payload.userId);
    return user;
  }
}
