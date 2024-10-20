import { Injectable } from '@nestjs/common';
import { Clips, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClipsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClipsCreateInput): Promise<Clips> {
    return this.prisma.clips.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClipsWhereUniqueInput;
    where?: Prisma.ClipsWhereInput;
    orderBy?: Prisma.ClipsOrderByWithRelationInput;
  }): Promise<Clips[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.clips.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.ClipsWhereUniqueInput): Promise<Clips | null> {
    return this.prisma.clips.findUnique({ where });
  }

  async update(params: {
    where: Prisma.ClipsWhereUniqueInput;
    data: Prisma.ClipsUpdateInput;
  }): Promise<Clips> {
    const { where, data } = params;
    return this.prisma.clips.update({ where, data });
  }

  async remove(where: Prisma.ClipsWhereUniqueInput): Promise<Clips> {
    return this.prisma.clips.delete({ where });
  }
}
