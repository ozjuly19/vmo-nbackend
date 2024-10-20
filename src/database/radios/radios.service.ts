import { Injectable } from '@nestjs/common';
import { Radios, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RadiosService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RadiosCreateInput): Promise<Radios> {
    return this.prisma.radios.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RadiosWhereUniqueInput;
    where?: Prisma.RadiosWhereInput;
    orderBy?: Prisma.RadiosOrderByWithRelationInput;
  }): Promise<Radios[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.radios.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.RadiosWhereUniqueInput): Promise<Radios | null> {
    return this.prisma.radios.findUnique({ where });
  }

  async update(params: {
    where: Prisma.RadiosWhereUniqueInput;
    data: Prisma.RadiosUpdateInput;
  }): Promise<Radios> {
    const { where, data } = params;
    return this.prisma.radios.update({ where, data });
  }

  async remove(where: Prisma.RadiosWhereUniqueInput): Promise<Radios> {
    return this.prisma.radios.delete({ where });
  }
}
