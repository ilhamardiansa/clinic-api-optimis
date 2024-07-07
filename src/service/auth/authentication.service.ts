import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { ZodError, z } from 'zod';
import { mailService } from '../mailer/mailer.service';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class AuthenticationService {
  private blacklist: Set<string> = new Set();

  addToBlacklist(token: string) {
    this.blacklist.add(token);
  }

  isInBlacklist(token: string): boolean {
    return this.blacklist.has(token);
  }
  
  constructor(
    private prisma: PrismaService,
    private readonly mailService: mailService,
  ) {}

  async register(AuthDTO) {
    const RegisterSchema = z.object({
      fullname: z.string().max(64).min(1),
      email: z.string().email().min(1),
      phone_number: z.string().min(1),
      password: z
        .string()
        .min(8)
        .regex(/[A-Z]/, {
          message: 'should contain at least one uppercase letter',
        })
        .regex(/[0-9]/, { message: 'should contain at least one number' })
        .min(1),
    });

    try {
      const validatedData = RegisterSchema.parse(AuthDTO);

      const checkuser = await this.prisma.user.findUnique({
        where: {
          email: AuthDTO.email,
          phone_number: AuthDTO.phone_number,
        },
      });
      if (checkuser) {
        return {
          status: false,
          message: 'Akun sudah tersedia',
          users: null,
          token: null,
        };
      }

      const userData = {
        email: AuthDTO.email,
        phone_number: AuthDTO.phone_number,
        password: AuthDTO.password,
        role_id: 1,
        verifed: 0,
      };

      const user = await this.prisma.user.create({ data: userData });

      const dataprofile = {
        fullname: AuthDTO.fullname,
        phoneNumber: AuthDTO.phone_number,
        profilImage:
          'https://api.dicebear.com/8.x/notionists/svg?seed=' +
          AuthDTO.fullname,
        noIdentity: null,
        birthDate: null,
        birthPlace: null,
        address: null,
        gender: null,
        workIn: null,
        bloodType: null,
        maritalStatus: null,
        nationality: null,
        religion: null,
        user: {
          connect: {
            id: user.id,
          },
        },
        cityId: null,
        neighborhoodNo: null,
        citizenNo: null,
        areaCode: null,
        responsibleForCosts: null,
      };

      const profile = await this.prisma.profile.create({ data: dataprofile });

      const otp = generateRandomNumber(100000, 999999);

      const sendemail = this.mailService.sendMail(
        user.email,
        'Verifikasi email',
        otp,
        dataprofile.fullname,
      );

      const saveotp = await this.prisma.otp.create({
        data: {
          kode_otp: otp,
          userId: user.id,
        },
      });

      const token = jwt.sign(
        { userId: user.id, verifikasi: false },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return {
        status: true,
        message: 'Berhasil',
        users: {
          id: user.id,
          full_name: profile.fullname,
          image: profile.profilImage,
          email: user.email,
          phone_number: user.phone_number,
          verifikasi: user.verifed === 1,
        },
        token: token,
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async verifikasi(VerifikasiDTO, tokenjwt) {
    const RegisterSchema = z.object({
      kode_otp: z.string().min(6),
    });

    try {
      const validatedData = RegisterSchema.parse(VerifikasiDTO);

      const extracttoken = jwt.verify(tokenjwt, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const checkuser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!checkuser) {
        return {
          status: false,
          message: 'Akun tidak terdaftar',
          users: {
            id: null,
            full_name: null,
            image: null,
            email: null,
            phone_number: null,
            verifikasi: null,
          },
          token: null,
        };
      }

      const getprofile = await this.prisma.profile.findUnique({
        where: {
          userId: userId,
        },
      });

      if (checkuser.verifed == 1) {
        return {
          status: false,
          message: 'Akun telah di verifikasi',
          users: {
            id: checkuser.id,
            full_name: getprofile.fullname,
            image: getprofile.profilImage,
            email: checkuser.email,
            phone_number: checkuser.phone_number,
            verifikasi: checkuser.verifed === 1,
          },
          token: null,
        };
      }

      const otpExists = await this.prisma.otp.findFirst({
        where: {
          kode_otp: parseInt(VerifikasiDTO.kode_otp),
          userId: checkuser.id,
          status: 0,
        },
      });

      if (!otpExists) {
        return {
          status: false,
          message: 'OTP Salah',
          users: {
            id: checkuser.id,
            full_name: getprofile.fullname,
            image: getprofile.profilImage,
            email: checkuser.email,
            phone_number: checkuser.phone_number,
            verifikasi: checkuser.verifed === 1,
          },
          token: null,
        };
      }

      const updateotp = await this.prisma.otp.update({
        where: { id: otpExists.id },
        data: { status: 1 },
      });

      const updateuser = await this.prisma.user.update({
        where: { id: checkuser.id },
        data: { verifed: 1 },
      });

      const newToken = jwt.sign(
        { userId: checkuser.id, verifikasi: false },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return {
        status: true,
        message: 'Berhasil',
        users: {
          id: checkuser.id,
          full_name: getprofile.fullname,
          image: getprofile.profilImage,
          email: checkuser.email,
          phone_number: checkuser.phone_number,
          verifikasi: checkuser.verifed === 1,
        },
        token: newToken,
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async signin(authDTO: AuthDTO) {
    const SigninSchema = z.object({
      email: z.string().email().min(1),
      password: z.string().min(8),
    });

    try {
      const validatedData = SigninSchema.parse(authDTO);

      const user = await this.prisma.user.findUnique({
        where: { email: authDTO.email },
      });

      if (!user || user.password !== authDTO.password) {
        return {
          status: false,
          message: 'Email atau password salah',
          users: null,
          token: null,
        };
      }

      const token = jwt.sign(
        { userId: user.id, verifikasi: user.verifed === 1 },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return {
        status: true,
        message: 'Berhasil',
        users: {
          id: user.id,
          email: user.email,
          phone_number: user.phone_number,
          verifikasi: user.verifed === 1,
        },
        token: token,
      };
    } catch (e) {
      if (e instanceof ZodError) {
        return {
          status: false,
          message: e.errors.map((error) => error.message).join(', '),
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: (e as Error).message,
        users: null,
        token: null,
      };
    }
  }

  async signout(authDTO: AuthDTO) {
    const SignoutSchema = z.object({
      token: z.string().min(1),
    });

    try {
      const validatedData = SignoutSchema.parse(authDTO);

      this.addToBlacklist(validatedData.token);

      return {
        status: true,
        message: 'Berhasil signout',
      };
    } catch (e) {
      if (e instanceof ZodError) {
        return {
          status: false,
          message: e.errors.map((error) => error.message).join(', '),
        };
      }
      return {
        status: false,
        message: (e as Error).message,
      };
    }
  }
}
