import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyService } from '../service/reply.service';
import { ReplyController } from '../controller/reply.controller';
import { Reply } from '../entity/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
