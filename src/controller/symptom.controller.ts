import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/middleware/role.guard';
import { Roles } from 'src/middleware/role.decorator';
import { format_json } from 'src/env';
import { SymptomService } from 'src/service/symptom.service';
import { SymptomDto } from 'src/dto/symptom/symptom.dto';
import { UpdateSymptomDto } from 'src/dto/symptom/update.symptom.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiSecurity,
} from '@nestjs/swagger';

@ApiTags('Symptoms')
@ApiSecurity('bearer')
@ApiBearerAuth()
@Controller('api/symptoms')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({
    status: 201,
    description: 'Symptom created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        poly_id: { type: 'number' },
      },
    },
  })
  async create(@Res() res, @Body() symptomDto: SymptomDto) {
    try {
      const createdSymptom =
        await this.symptomService.createSymptom(symptomDto);
      return res
        .status(201)
        .json(
          format_json(
            201,
            true,
            null,
            null,
            'Symptom created successfully',
            createdSymptom,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to create symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({
    status: 200,
    description: 'Symptom updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        poly_id: { type: 'number' },
      },
    },
  })
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() updateSymptomDto: UpdateSymptomDto,
  ) {
    try {
      const updatedSymptom = await this.symptomService.updateSymptom(
        id,
        updateSymptomDto,
      );
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Symptom updated successfully',
            updatedSymptom,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to update symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get all symptoms' })
  @ApiResponse({
    status: 200,
    description: 'Symptoms retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string' },
          poly_id: { type: 'number' },
        },
      },
    },
  })
  async findAll(@Res() res) {
    try {
      const symptoms = await this.symptomService.findAll();
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Symptoms retrieved successfully',
            symptoms,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to retrieve symptoms',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator', 'patient', 'doctor', 'guest')
  @ApiOperation({ summary: 'Get symptom details' })
  @ApiResponse({
    status: 200,
    description: 'Symptom retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string' },
        description: { type: 'string' },
        poly_id: { type: 'number' },
      },
    },
  })
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const symptom = await this.symptomService.findOne(id);
      if (!symptom) {
        throw new HttpException(
          format_json(404, false, 'Not Found', null, 'Symptom not found', null),
          HttpStatus.NOT_FOUND,
        );
      }
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Symptom retrieved successfully',
            symptom,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to retrieve symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'manager', 'operator')
  @ApiOperation({ summary: 'Delete symptom' })
  @ApiResponse({
    status: 200,
    description: 'Symptom deleted successfully',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'null' },
      },
    },
  })
  async remove(@Res() res, @Param('id') id: string) {
    try {
      await this.symptomService.removeSymptom(id);
      return res
        .status(200)
        .json(
          format_json(
            200,
            true,
            null,
            null,
            'Symptom deleted successfully',
            null,
          ),
        );
    } catch (error: any) {
      throw new HttpException(
        format_json(
          400,
          false,
          'Bad Request',
          null,
          'Failed to delete symptom',
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
