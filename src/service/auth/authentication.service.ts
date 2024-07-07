import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { ZodError, z } from 'zod';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class AuthenticationService {
  constructor(private prisma: PrismaService) {}

  async register(
    AuthDTO : AuthDTO){
    const RegisterSchema = z.object({
      fullname: z.string().max(64).min(1),
      email: z.string().email().min(1),
      phone_number: z.string().min(1),
      password: z.string().min(8).regex(/[A-Z]/, { message: 'should contain at least one uppercase letter' }).regex(/[0-9]/, { message: 'should contain at least one number' }).min(1),
    });

    try {
      const validatedData = RegisterSchema.parse(AuthDTO);
      const userData = {
        email: AuthDTO.email,
        phone_number: AuthDTO.phone_number,
        password: AuthDTO.password,
        role_id: 1,
        verifed: 0,
      };

      const user = await this.prisma.user.create({ data: userData })

      const dataprofile = {
        fullname: AuthDTO.fullname,
        phoneNumber: AuthDTO.phone_number,
        profilImage: 'https://api.dicebear.com/8.x/notionists/svg?seed=' + AuthDTO.fullname,
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
      
      const profile = await this.prisma.profile.create({ data: dataprofile })

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
    } catch (e) {
      if (e instanceof ZodError) {
        return {
          status: false,
          message: e.errors.map(error => error).join(', '),
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e,
        users: null,
        token: null,
      };
    }
  }
}
