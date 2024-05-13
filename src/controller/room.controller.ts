import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Room } from '../entity/room.entity';
import { RoomService } from '../service/room.service';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Room> {
    return this.roomService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() room: Room): Promise<Room> {
    return this.roomService.create(room);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() room: Room): Promise<Room> {
    return this.roomService.update(parseInt(id, 10), room);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.roomService.delete(parseInt(id, 10));
  }
}
