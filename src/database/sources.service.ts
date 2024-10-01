import { Injectable } from '@nestjs/common';
import { Sources, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class SourcesService {
  constructor(private prisma: PrismaService) { }

  async createSource(data: Prisma.SourcesCreateInput): Promise<Sources> {
    return this.prisma.sources.create({ data });
  }

  async sources(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SourcesWhereUniqueInput;
    where?: Prisma.SourcesWhereInput;
    orderBy?: Prisma.SourcesOrderByWithRelationInput;
  }): Promise<Sources[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.sources.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async source(where: Prisma.SourcesWhereUniqueInput): Promise<Sources | null> {
    return this.prisma.sources.findUnique({ where });
  }

  async updateSource(params: {
    data: Prisma.SourcesUpdateInput,
    where: Prisma.SourcesWhereUniqueInput
  }): Promise<Sources> {
    const { data, where } = params;
    return this.prisma.sources.update({ data, where });
  }

  async removeSource(where: Prisma.SourcesWhereUniqueInput): Promise<Sources> {
    return this.prisma.sources.delete({ where });
  }
}
