import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findById(id): Promise<Review> {
    return this.reviewRepository.findOne(id);
  }

  async create(review: Review): Promise<Review> {
    return this.reviewRepository.save(review);
  }

  async update(id, review: Review): Promise<Review> {
    await this.reviewRepository.update(id, review);
    return this.reviewRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
