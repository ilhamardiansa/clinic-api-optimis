import { Controller, Post, Body, Req, UseGuards, UploadedFile, UsePipes, Res } from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { format_json } from 'src/env';
import { v2 as cloudinary } from 'cloudinary';
import path, { basename, extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { AuthenticationService } from 'src/service/auth/Authentication.service';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Controller('api')
export class AuthController {
  constructor(
    private readonly AuthenticationService: AuthenticationService,
  ) {}

  @Post('auth/register')
  @UsePipes(CustomValidationPipe)
  async register(@Body() authDTO: AuthDTO, @UploadedFile() file: Express.Multer.File, @Res() res: Response) {
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
          .json(format_json(400, false, true, null, user.message, null));
      }
    } catch (error) {
      return res
        .status(400)
        .json(format_json(400, false, true, null, 'Server Error '+error, error));
    }
  }
}