import { Injectable } from '@nestjs/common';
import { RadioSource, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RadioSourceService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RadioSourceCreateInput): Promise<RadioSource> {
    return this.prisma.radioSource.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RadioSourceWhereUniqueInput;
    where?: Prisma.RadioSourceWhereInput;
    orderBy?: Prisma.RadioSourceOrderByWithRelationInput;
  }): Promise<RadioSource[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.radioSource.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    where: Prisma.RadioSourceWhereUniqueInput,
  ): Promise<RadioSource | null> {
    return this.prisma.radioSource.findUnique({ where });
  }

  async update(params: {
    where: Prisma.RadioSourceWhereUniqueInput;
    data: Prisma.RadioSourceUpdateInput;
  }): Promise<RadioSource> {
    const { where, data } = params;
    return this.prisma.radioSource.update({ where, data });
  }

  async remove(
    where: Prisma.RadioSourceWhereUniqueInput,
  ): Promise<RadioSource> {
    return this.prisma.radioSource.delete({ where });
  }
}
