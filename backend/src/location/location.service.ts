import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    if (!search) {
      return this.prisma.location.findMany();
    }

    return this.prisma.location.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
        ],
      },
    });
  }

  async create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }
}