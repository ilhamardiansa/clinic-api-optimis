import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Review } from '../entity/review.entity';
import { ReviewService } from '../service/review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Review> {
    return this.reviewService.findById(parseInt(id, 10));
  }

  @Post()
  async create(@Body() review: Review): Promise<Review> {
    return this.reviewService.create(review);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() review: Review,
  ): Promise<Review> {
    return this.reviewService.update(parseInt(id, 10), review);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.reviewService.delete(parseInt(id, 10));
  }
}
