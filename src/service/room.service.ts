import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entity/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findById(id): Promise<Room> {
    return this.roomRepository.findOne(id);
  }

  async create(room: Room): Promise<Room> {
    return this.roomRepository.save(room);
  }

  async update(id, room: Room): Promise<Room> {
    await this.roomRepository.update(id, room);
    return this.roomRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
