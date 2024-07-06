import {
<<<<<<< HEAD
    Controller,
    Get,
    Post,
    UseGuards,
    Req,
    Res,
    HttpStatus,
    Body,
    UsePipes
  } from '@nestjs/common';
=======
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
>>>>>>> 0520f9ffe311e9b1b58c09ba0bfe7515b3026973
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { Request, Response } from 'express';
import { FeedbackDTO } from 'src/dto/feedback.dto';
import { FeedbackService } from 'src/service/feedback.service';
<<<<<<< HEAD
import { CustomValidationPipe } from 'src/custom-validation.pipe';
  
=======
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';

>>>>>>> 0520f9ffe311e9b1b58c09ba0bfe7515b3026973
@Controller('api')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('feedback')
  @Roles('admin', 'manager', 'operator')
  async find(@Res() res: Response, @Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res
          .status(HttpStatus.BAD_REQUEST)
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
        console.log('Bearer token is missing');
        return res
          .status(HttpStatus.BAD_REQUEST)
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

      console.log('Token:', token);

      const getdata = await this.feedbackService.getdata(token);

      console.log('getdata response:', getdata);

      if (getdata.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, getdata.message, getdata.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, null, getdata.message, null));
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error.message,
            error,
          ),
        );
    }
  }

  @Post('feedback')
<<<<<<< HEAD
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  async create(@Body() feedbackdto: FeedbackDTO, @Res() res: Response, @Req() req: Request) {
=======
  @Roles('admin', 'manager', 'operator')
  async create(
    @Body() feedbackDto: FeedbackDTO,
    @Res() res: Response,
    @Req() req: Request,
  ) {
>>>>>>> 0520f9ffe311e9b1b58c09ba0bfe7515b3026973
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        console.log('Authorization header is missing');
        return res
          .status(HttpStatus.BAD_REQUEST)
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
        console.log('Bearer token is missing');
        return res
          .status(HttpStatus.BAD_REQUEST)
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

      console.log('Token:', token);
      console.log('FeedbackDTO:', feedbackDto);

      const create = await this.feedbackService.create(token, feedbackDto);

      console.log('Create response:', create);

      if (create.status) {
        return res
          .status(HttpStatus.OK)
          .json(
            format_json(200, true, null, null, create.message, create.data),
          );
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(format_json(400, false, null, null, create.message, null));
      }
    } catch (error) {
      console.error('Server Error:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          format_json(
            500,
            false,
            true,
            null,
            'Server Error ' + error.message,
            error,
          ),
        );
    }
  }
}
