import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, category?: string) {
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    return this.prisma.location.findMany({ where });
  }

  async findCategories() {
    const result = await this.prisma.location.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return result.map((item) => item.category);
  }

  async findOne(id: string) {
    return this.prisma.location.findUnique({ where: { id } });
  }

  async create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }
}