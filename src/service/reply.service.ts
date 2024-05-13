import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reply } from '../entity/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}

  async findAll(): Promise<Reply[]> {
    return this.replyRepository.find();
  }

  async findById(id): Promise<Reply> {
    return this.replyRepository.findOne(id);
  }

  async create(reply: Reply): Promise<Reply> {
    return this.replyRepository.save(reply);
  }

  async update(id, reply: Reply): Promise<Reply> {
    await this.replyRepository.update(id, reply);
    return this.replyRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.replyRepository.delete(id);
  }
}
