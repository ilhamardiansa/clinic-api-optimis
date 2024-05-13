import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Reply } from '../entity/reply.entity';
import { ReplyService } from '../service/reply.service';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get()
  async findAll(): Promise<Reply[]> {
    return this.replyService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Reply> {
    return this.replyService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() reply: Reply): Promise<Reply> {
    return this.replyService.create(reply);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() reply: Reply): Promise<Reply> {
    return this.replyService.update(parseInt(id, 10), reply);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.replyService.delete(parseInt(id, 10));
  }
}
