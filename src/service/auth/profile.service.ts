import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ProfileDto } from 'src/dto/auth/profile.dto';
import { PrismaService } from 'src/prisma.service';
import { ZodError, z } from 'zod';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findprofile(tokenjwt){
    try {

        const extracttoken = jwt.verify(tokenjwt, process.env.JWT_SECRET);
  
        if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
          var userId = extracttoken.userId;
        }

        const getprofile = await this.prisma.profile.findUnique({
            where: { 
              user_id: userId
            },
            include: {
                user: true,
              },
          });
        
          if(!getprofile){
            return {
                status: false,
                message: 'Profile tidak ditemukan',
                users: null,
                token: null,
              };
          }

        return {
            status: true,
            message: 'Berhasil',
            users: getprofile,
            token: null,
        };

    } catch (e : any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map(error => ({
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

  async updatecreate(ProfileDTO: ProfileDto, tokenjwt: string) {
    try {
      const profileData = { ...ProfileDTO };
  
      console.log('ProfileDTO:', profileData); 
  
      const profileSchema = z.object({
        fullname: z.string().max(64).min(1),
        phone_number: z.string().min(1),
        no_identity: z.string().min(1),
        birth_date: z.string(),
        birth_place: z.string().optional(),
        address: z.string().min(1),
        gender: z.string().min(1),
        work_in: z.string().optional(),
        blood_type: z.string().optional(),
        marital_status: z.string().optional(),
        nationality: z.string().optional(),
        religion: z.string().optional(),
        city_id: z.number().int().optional(),
        neighborhood_no: z.number().int().optional(),
        citizen_no: z.number().int().optional(),
        area_code: z.number().int().optional(),
        responsibleForCosts: z.string().optional(),
      });
  
      const validatedData = profileSchema.parse(profileData);
      const extracttoken = jwt.verify(tokenjwt, process.env.JWT_SECRET);
  
      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }
  
      const getprofile = await this.prisma.profile.findUnique({
        where: {
          user_id: userId
        },
      });
  
      if (!getprofile) {
        return {
          status: false,
          message: 'Profile tidak ditemukan',
          errors: null,
          users: null,
          token: null,
        };
      }
  
      const updateprofile = await this.prisma.profile.update({
        where: { user_id: userId },
        data: profileData,
        include: {
          user: true,
        },
      });
  
      return {
        status: true,
        message: 'Berhasil',
        users: updateprofile,
        token: null,
      };
  
    } catch (e : any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map(error => ({
          field: error.path.join('.'),
          message: error.message,
        }));
  
        return {
          status: 400,
          success: false,
          errors: errorMessages,
          meta: null,
          message: 'Validasi gagal',
          data: null,
        };
      }
  
      return {
        status: 400,
        success: false,
        errors: [{
          field: "",
          message: e.message || 'Terjadi kesalahan',
        }],
        meta: null,
        message: 'Validasi gagal',
        data: null,
      };
    }
  }
  
  
}
