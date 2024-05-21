import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { SignInDto } from 'src/dto/auth/signin.dto';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';
import { format_json } from 'src/env';
import { AuthService } from 'src/service/auth/auth.service';
import { mailService } from 'src/service/mailer/mailer.service';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from 'src/dto/auth/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ChangePassDTO } from 'src/dto/auth/change.pass.dto';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: mailService,
  ) {}

  @Post('auth/register')
  async register(@Body() authDTO: AuthDTO) {
    try {
      const { fullname, email, phone_number, password } = authDTO;
      const user = await this.authService.register(
        fullname,
        email,
        phone_number,
        password,
      );
      if (user.status == true) {
        const code = generateRandomNumber(100000, 999999);
        const checkotp = this.authService.checkotp(code);
        let otp;
        if (checkotp) {
          otp = code;
        } else {
          otp = generateRandomNumber(100000, 999999);
        }
        const sendemail = this.mailService.sendMail(
          email,
          'Verifikasi email',
          otp,
          fullname,
        );
        const saveotp = await this.authService.saveOtp(otp, user.users.id, 0);
        return format_json(
          200,
          true,
          false,
          null,
          'User signed up successfully',
          {
            user: user,
          },
        );
      } else {
        return format_json(400, false, true, null, user.message, null);
      }
    } catch (error) {
      return format_json(400, false, true, null, 'Server Error', error);
    }
  }

  @Post('auth/signin')
  async signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    const token = await this.authService.signIn(email, password);
    if (token.users.verifikasi == true) {
      return format_json(
        200,
        true,
        false,
        null,
        'User signed in successfully',
        token,
      );
    } else {
      const code = generateRandomNumber(100000, 999999);
      const checkotp = this.authService.checkotp(code);
      let otp;
      if (checkotp) {
        otp = code;
      } else {
        otp = generateRandomNumber(100000, 999999);
      }
      const sendemail = this.mailService.sendMail(
        email,
        'Verifikasi email',
        otp,
        token.users.email,
      );
      const saveotp = await this.authService.saveOtp(otp, token.users.id, 0);
      return format_json(
        200,
        true,
        false,
        null,
        'Silakan verifikasi email anda',
        token,
      );
    }
  }

  @Post('auth/verification')
  @UseGuards(AuthGuard('jwt'))
  async verifikasiEmail(
    @Body() verifikasiDTO: VerifikasiDTO,
    @Req() req: Request,
  ) {
    try {
      const { kode_otp } = verifikasiDTO;
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(
          400,
          false,
          null,
          null,
          'Bearer token is missing',
          null,
        );
      }
      const verifikasiotp = await this.authService.verifikasi(kode_otp, token);
      if (verifikasiotp.status == true) {
        return format_json(200, true, null, null, verifikasiotp.message, {
          user: verifikasiotp.users,
        });
      } else {
        return format_json(400, false, null, null, verifikasiotp.message, null);
      }
    } catch (error) {
      return format_json(400, false, true, null, 'Server Error', error);
    }
  }

  @Post('auth/resend')
  @UseGuards(AuthGuard('jwt'))
  async resendOTP(@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(
          400,
          false,
          null,
          null,
          'Bearer token is missing',
          null,
        );
      }

      const code = generateRandomNumber(100000, 999999);
      const checkotp = this.authService.checkotp(code);
      let otp;
      if (checkotp) {
        otp = code;
      } else {
        otp = generateRandomNumber(100000, 999999);
      }

      const resendotp = await this.authService.resendotp(token, otp);
      if (resendotp.status == true) {
        return format_json(200, true, null, null, resendotp.message, {
          user: resendotp.users,
        });
      } else {
        return format_json(400, false, null, null, resendotp.message, null);
      }
    } catch (error) {
      return format_json(400, false, true, null, 'Server Error', error);
    }
  }

  @Get('users/profiles')
  @UseGuards(AuthGuard('jwt'))
  async get_profile(@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(
          400,
          false,
          null,
          null,
          'Bearer token is missing',
          null,
        );
      }

      const getprofile = this.authService.profile(token);

      if ((await getprofile).status === true) {
        return format_json(200, true, null, null, (await getprofile).message, {
          user: (await getprofile).users,
        });
      } else {
        return format_json(
          400,
          false,
          null,
          null,
          (await getprofile).message,
          null,
        );
      }
    } catch (error) {
      return format_json(400, false, true, null, 'Server Error', error);
    }
  }

  @Post('users/update/profiles')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = uuidv4();
          const extension = file.originalname.split('.').pop();
          cb(null, `${randomName}.${extension}`);
        },
      }),
    }),
  )
  async update_profile(
    @Body() profileDTO: ProfileDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(
          400,
          false,
          null,
          null,
          'Bearer token is missing',
          null,
        );
      }

      const {
        fullname,
        phone_number,
        profil_image,
        no_identity,
        birth_date,
        birth_place,
        address,
        gender,
        work_in,
        blood_type,
        marital_status,
        nationality,
        religion,
        country_id,
        region_id,
        city_id,
        district_id,
        village_id,
        neighborhood_no,
        citizen_no,
        area_code,
      } = profileDTO;

      const profile = {
        fullname: fullname,
        phone_number: phone_number,
        profil_image: profil_image,
        no_identity: no_identity,
        birth_date: birth_date,
        birth_place: birth_place,
        address: address,
        gender: gender,
        work_in: work_in,
        blood_type: blood_type,
        marital_status: marital_status,
        nationality: nationality,
        religion: religion,
        country_id: country_id,
        region_id: region_id,
        city_id: city_id,
        district_id: district_id,
        village_id: village_id,
        neighborhood_no: neighborhood_no,
        citizen_no: citizen_no,
        area_code: area_code,
      };

      const updateProfile = this.authService.update_profile(token, profile);

      if ((await updateProfile).status == true) {
        return format_json(
          200,
          true,
          null,
          null,
          (await updateProfile).message,
          {
            user: (await updateProfile).users,
          },
        );
      } else {
        return format_json(
          400,
          false,
          null,
          null,
          (await updateProfile).message,
          null,
        );
      }
    } catch (error) {
      return format_json(400, false, true, null, 'Server Error', error);
    }
  }

  @Post('users/change-password')
  @UseGuards(AuthGuard('jwt'))
  async change_password(
    @Body() ChangePassDTO: ChangePassDTO,
    @Req() req: Request,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(
          400,
          false,
          null,
          null,
          'Bearer token is missing',
          null,
        );
      }

      const { password, confirmPassword } = ChangePassDTO;

      const change_password = this.authService.change_pass(token, password);

      if ((await change_password).status === true) {
        return format_json(
          200,
          true,
          null,
          null,
          (await change_password).message,
          {
            user: (await change_password).users,
          },
        );
      } else {
        return format_json(
          400,
          false,
          null,
          null,
          (await change_password).message,
          null,
        );
      }
    } catch (error) {
      return format_json(400, false, true, null, 'Server Error', error);
    }
  }
}
