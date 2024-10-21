import { Injectable } from '@nestjs/common';
import { Files, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { rmSync, writeFileSync } from 'fs';
import { configDotenv } from 'dotenv';
configDotenv();

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async writeFileToDiskAndCreate(
    data: Prisma.FilesCreateInput,
    buffer: Buffer,
  ): Promise<Files> {
    writeFileSync(`${process.env.UPLOAD_PATH}/${data.filename}`, buffer);

    return this.create(data);
  }

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
    // Fetch filename if not provided
    if (!where.filename) where.filename = (await this.findOne(where))?.filename;

    try {
      rmSync(`${process.env.UPLOAD_PATH}/${where.filename}`);
    } catch (e) {
      // if the error is 42680 ignore it that means the file is already deleted
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }

    return this.prisma.files.delete({ where });
  }
}
