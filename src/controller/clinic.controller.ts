import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ClinicService } from '../service/clinic/clinic.service';
import { Clinic } from '../entity/clinic.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/service/auth/auth.service';
import { Roles } from 'src/role.enum';
import { RolesGuard } from 'src/middleware/role.guard';
import { User } from 'src/entity/profile/user.entity';
import { AuthenticatedRequest } from 'src/interface/request.with.user.interface';

@Controller('api/clinics')
export class ClinicController {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  @Roles('admin')
  async createClinic(
    @Body() clinicData: Partial<Clinic>,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;
    if (!user || !user.roles.includes('admin')) {
      throw new UnauthorizedException(
        'You are not allowed to perform this action',
      );
    }

    const clinic = await this.clinicService.createClinic(clinicData);
    return {
      status: 200,
      success: true,
      errors: null,
      meta: null,
      message: 'Clinic successfully created',
      data: clinic,
    };
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateClinic(
    @Param('id') id: number,
    @Body() clinicData: Partial<Clinic>,
  ) {
    const clinic = await this.clinicService.updateClinic(id, clinicData);
    return {
      status: 200,
      success: true,
      errors: null,
      meta: null,
      message: 'Clinic successfully updated',
      data: clinic,
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async deleteClinic(@Param('id') id: number) {
    await this.clinicService.deleteClinic(id);
    return {
      status: 200,
      success: true,
      errors: null,
      meta: null,
      message: 'Clinic successfully deleted',
      data: null,
    };
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'doctor', 'patient')
  async getAllClinics() {
    const clinics = await this.clinicService.getAllClinics();
    return {
      status: 200,
      success: true,
      errors: null,
      meta: null,
      message: 'Clinics successfully retrieved',
      data: clinics,
    };
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'doctor', 'patient')
  async getClinicById(@Param('id') id: number) {
    const clinic = await this.clinicService.getClinicById(id);
    return {
      status: 200,
      success: true,
      errors: null,
      meta: null,
      message: 'Clinic successfully retrieved',
      data: clinic,
    };
  }
}
