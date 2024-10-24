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
    // Make sure data.name is an allowed file name
    if (!data.name.match(/^[a-zA-Z0-9-_]+$/)) {
      throw new Error(`Invalid file name: "${data.name}"`);
    }

    writeFileSync(`${process.env.UPLOAD_PATH}/${data.name}`, buffer);

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

  async remove(where_file: Prisma.FilesWhereUniqueInput): Promise<Files> {
    // Fetch file name if not provided
    if (!where_file.name)
      where_file.name = (await this.findOne(where_file))?.name;

    const file_name = where_file.name;

    try {
      rmSync(`${process.env.UPLOAD_PATH}/${file_name}`);
    } catch (e) {
      // if the error is 42680 ignore it that means the file is already deleted
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }

    return this.prisma.files.delete({ where: where_file });
  }
}
