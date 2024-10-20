import { Injectable } from '@nestjs/common';
import { Files, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.FilesCreateInput): Promise<Files> {
    return this.prisma.files.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FilesWhereUniqueInput;
    where?: Prisma.FilesWhereInput;
    orderBy?: Prisma.FilesOrderByWithRelationInput;
  }): Promise<Files[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.files.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.FilesWhereUniqueInput): Promise<Files | null> {
    return this.prisma.files.findUnique({ where });
  }

  async update(params: {
    where: Prisma.FilesWhereUniqueInput;
    data: Prisma.FilesUpdateInput;
  }): Promise<Files> {
    const { where, data } = params;
    return this.prisma.files.update({ where, data });
  }

  async remove(where: Prisma.FilesWhereUniqueInput): Promise<Files> {
    return this.prisma.files.delete({ where });
  }
}
