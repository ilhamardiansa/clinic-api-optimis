import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Document } from '../entity/document.entity';
import { DocumentService } from '../service/document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async findAll(): Promise<Document[]> {
    return this.documentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Document> {
    return this.documentService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() document: Document): Promise<Document> {
    return this.documentService.create(document);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() document: Document,
  ): Promise<Document> {
    return this.documentService.update(parseInt(id, 10), document);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.documentService.delete(parseInt(id, 10));
  }
}
