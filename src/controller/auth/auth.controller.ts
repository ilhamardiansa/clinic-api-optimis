import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UploadedFile,
  UsePipes,
  Res,
  Get,
  Put,
} from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { format_json } from 'src/env';
import { v2 as cloudinary } from 'cloudinary';
import path, { basename, extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { AuthenticationService } from 'src/service/auth/Authentication.service';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from 'src/service/auth/profile.service';
import { ProfileDto } from 'src/dto/auth/profile.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(
    private readonly AuthenticationService: AuthenticationService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('auth/register')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Success' })
  async register(
    @Body() authDTO: AuthDTO,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const { fullname, email, phone_number, password } = authDTO;
      const user = await this.AuthenticationService.register(authDTO);
      if (user.status == true) {
        return res.status(200).json(
          format_json(200, true, false, null, 'User signed up successfully', {
            user: user.users,
            token: user.token,
          }),
        );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, true, user.errors, user.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Post('auth/verification')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Verifikasi akun' })
  @ApiResponse({ status: 200, description: 'Success' })
  async verifikasiEmail(
    @Body() verifikasiDTO: VerifikasiDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { kode_otp } = verifikasiDTO;
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }
      const verifikasiotp = await this.AuthenticationService.verifikasi(
        verifikasiDTO,
        token,
      );
      if (verifikasiotp.status == true) {
        return res.status(200).json(
          format_json(200, true, null, null, verifikasiotp.message, {
            user: verifikasiotp.users,
            token: verifikasiotp.token,
          }),
        );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              verifikasiotp.errors,
              verifikasiotp.message,
              null,
            ),
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error ', error));
    }
  }

  @Get('auth/personal-data')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get personal data' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getpersonaldata(@Req() req: Request, @Res() res: Response) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }
      const getprofile = await this.profileService.findprofile(token);
      if (getprofile.status == true) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              getprofile.message,
              getprofile.users,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              getprofile.errors,
              null,
              getprofile.message,
              null,
            ),
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error ', error));
    }
  }

  @Put('auth/personal-data')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Update personal data' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updatepersonaldata(
    @Body() ProfileDTO: ProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }

      const dataprofile = {
        fullname: ProfileDTO.fullname,
        phone_number: ProfileDTO.phone_number,
        no_identity: ProfileDTO.no_identity,
        birth_date: ProfileDTO.birth_date,
        birth_place: ProfileDTO.birth_place,
        address: ProfileDTO.address,
        gender: ProfileDTO.gender,
        work_in: ProfileDTO.work_in,
        blood_type: ProfileDTO.blood_type,
        marital_status: ProfileDTO.marital_status,
        nationality: ProfileDTO.nationality,
        religion: ProfileDTO.religion,
        city_id: ProfileDTO.city_id,
        neighborhoodNo: ProfileDTO.neighborhoodNo,
        citizen_no: ProfileDTO.citizen_no,
        area_code: ProfileDTO.area_code,
        responsibleForCosts: ProfileDTO.responsibleForCosts,
      };

      const getprofile = await this.profileService.updatecreate(
        dataprofile,
        token,
      );
      if (getprofile.status == true) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              getprofile.message,
              getprofile.users,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              getprofile.errors,
              null,
              getprofile.message,
              null,
            ),
          );
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error ', error));
    }
  }

  @Post('auth/signin')
  async signin(@Body() authDTO: AuthDTO, @Res() res: Response) {
    try {
      const user = await this.AuthenticationService.signin(authDTO);
      if (user.status) {
        return res.status(200).json(
          format_json(200, true, false, null, 'User signed in successfully', {
            user: user.users,
            token: user.token,
          }),
        );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, true, null, user.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }

  @Post('auth/signout')
  async signout(@Body() authDTO: AuthDTO, @Res() res: Response) {
    try {
      const user = await this.AuthenticationService.signout(authDTO);
      if (user.status) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              false,
              null,
              'User signed out successfully',
              null,
            ),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, true, null, user.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ' + error, error),
        );
    }
  }
}
