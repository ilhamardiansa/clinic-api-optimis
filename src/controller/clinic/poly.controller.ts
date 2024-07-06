import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  HttpException,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { PolyDto } from 'src/dto/clinic/poly.dto';
import { UpdatePolyDto } from 'src/dto/clinic/update.poly.dto';
import { PolyService } from 'src/service/clinic/poly.service';
import { CustomValidationPipe } from 'src/custom-validation.pipe';

@Controller('api/polies')
export class PolyController {
  constructor(private readonly polyService: PolyService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
<<<<<<< HEAD
  @Roles('admin')
  @UsePipes(CustomValidationPipe)
=======
  @Roles('admin', 'manager', 'operator')
>>>>>>> 0520f9ffe311e9b1b58c09ba0bfe7515b3026973
  async create(@Body() polyDto: PolyDto, @Res() res: Response) {
    try {
      const createdPoly = await this.polyService.createPoly(polyDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Poly created successfully',
            createdPoly,
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
            'Failed to create poly',
            error.message,
          ),
        );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
<<<<<<< HEAD
  @Roles('admin')
  @UsePipes(CustomValidationPipe)
=======
  @Roles('admin', 'manager', 'operator')
>>>>>>> 0520f9ffe311e9b1b58c09ba0bfe7515b3026973
  async update(
    @Param('id') id: string,
    @Body() updatePolyDto: UpdatePolyDto,
    @Res() res: Response,
  ) {
    try {
      const updatedPoly = await this.polyService.updatePoly(+id, updatePolyDto);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Poly updated successfully',
            updatedPoly,
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
            'Failed to update poly',
            error.message,
          ),
        );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  async findAll(@Res() res: Response) {
    try {
      const polies = await this.polyService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Polies retrieved successfully',
            polies,
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
            'Failed to retrieve polies',
            error.message,
          ),
        );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const poly = await this.polyService.findOne(+id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Poly retrieved successfully',
            poly,
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
            'Failed to retrieve poly',
            error.message,
          ),
        );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.polyService.removePoly(+id);
      return res
        .status(200)
        .json(
          format_json(200, true, null, null, 'Poly deleted successfully', null),
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
            'Failed to delete poly',
            error.message,
          ),
        );
    }
  }
}
