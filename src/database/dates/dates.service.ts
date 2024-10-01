import { Injectable } from '@nestjs/common';
import { Dates, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatesService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(data: Prisma.DatesCreateInput): Promise<Dates> {
    return this.prisma.dates.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DatesWhereUniqueInput;
    where?: Prisma.DatesWhereInput;
    orderBy?: Prisma.DatesOrderByWithRelationInput;
  }): Promise<Dates[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.dates.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.DatesWhereUniqueInput): Promise<Dates | null> {
    return this.prisma.dates.findUnique({ where });
  }

  async update(params: {
    where: Prisma.DatesWhereUniqueInput;
    data: Prisma.DatesUpdateInput;
  }): Promise<Dates> {
    const { where, data } = params;
    return this.prisma.dates.update({ where, data });
  }

  async remove(where: Prisma.DatesWhereUniqueInput): Promise<Dates> {
    return this.prisma.dates.delete({ where });
  }
}
