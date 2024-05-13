import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Role } from '../entity/role.entity';
import { RoleService } from '../service/role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.roleService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() role: Role): Promise<Role> {
    return this.roleService.create(role);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() role: Role): Promise<Role> {
    return this.roleService.update(parseInt(id, 10), role);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.roleService.delete(parseInt(id, 10));
  }
}
