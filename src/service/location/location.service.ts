import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma.service';
import { Repository, Like } from 'typeorm';

@Injectable()
export class WilayahService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async getCities(
    query: string,
    page: number,
    limit: number,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const skip = Math.floor((page - 1) * limit);
  
    const whereClause = query
      ? {
          OR: [
            { provinsi: { contains: query.toLowerCase(), mode: undefined } },
            { kabupaten: { contains: query.toLowerCase(), mode: undefined } },
            { kecamatan: { contains: query.toLowerCase(), mode: undefined } },
            { kelurahan: { contains: query.toLowerCase(), mode: undefined } },
          ],
        }
      : {};
  
    if (!limit) {
      limit = 10;
    }
  
    const result = await this.prisma.wilayah.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: {
        kabupaten: order,
      },
    });
  
    return result;
  }
}
