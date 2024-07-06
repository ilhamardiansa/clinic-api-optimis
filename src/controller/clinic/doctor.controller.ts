import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Res,
  HttpException,
  HttpStatus,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { DoctorService } from 'src/service/clinic/doctor.service';
import { UpdateDoctorDto } from 'src/dto/clinic/update.doctor.dto';
import { DoctorDto } from 'src/dto/clinic/doctor.dto';
import { CustomValidationPipe } from 'src/custom-validation.pipe';

@Controller('api/doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(CustomValidationPipe)
  async create(@Body() doctorDto: DoctorDto, @Res() res: Response) {
    try {
      const createdDoctor = await this.doctorService.createDoctor(doctorDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Doctor created successfully',
            createdDoctor,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to create doctor',
            error.message,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @UsePipes(CustomValidationPipe)
  async update(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @Res() res: Response,
  ) {
    try {
      const updatedDoctor = await this.doctorService.updateDoctor(
        +id,
        updateDoctorDto,
      );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Doctor updated successfully',
            updatedDoctor,
          ),
        );
    } catch (error) {
      return res
        .status(400)
        .json(
          format_json(
            400,
            false,
            'Bad Request',
            null,
            'Failed to update doctor',
            error.message,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'patient', 'doctor')
  async findAll(
    @Query('q') query: string = '',
    @Query('page') page: number = null,
    @Query('limit') limit: number = null,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Res() res: Response,
  ) {
    try {
      const doctors = await this.doctorService.findAll(
        query,
        page,
        limit,
        order,
      );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Doctors retrieved successfully',
            doctors,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve doctors',
            error.message,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'patient', 'doctor')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const doctor = await this.doctorService.findOne(+id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Doctor retrieved successfully',
            doctor,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to retrieve doctor',
            error.message,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.doctorService.removeDoctor(+id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Doctor deleted successfully',
            null,
          ),
        );
    } catch (error) {
      return res
        .status(500)
        .json(
          format_json(
            500,
            false,
            'Internal Server Error',
            null,
            'Failed to delete doctor',
            error.message,
          ),
        );
    }
  }
}
