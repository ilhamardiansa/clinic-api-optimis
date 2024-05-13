import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Menu } from '../entity/menu.entity';
import { MenuService } from '../service/menu.service';

@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Menu> {
    return this.menuService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() menu: Menu): Promise<Menu> {
    return this.menuService.create(menu);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() menu: Menu): Promise<Menu> {
    return this.menuService.update(parseInt(id, 10), menu);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.menuService.delete(parseInt(id, 10));
  }
}
