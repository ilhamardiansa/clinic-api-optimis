import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entity/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async findAll(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async findById(id): Promise<Document> {
    return this.documentRepository.findOne(id);
  }

  async create(document: Document): Promise<Document> {
    return this.documentRepository.save(document);
  }

  async update(id, document: Document): Promise<Document> {
    await this.documentRepository.update(id, document);
    return this.documentRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
}
