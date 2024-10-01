import { Module } from '@nestjs/common';
import { SourcesService } from './sources/sources.service';
import { PrismaService } from './prisma/prisma.service';
import { SourcesController } from './sources/sources.controller';

@Module({
  controllers: [SourcesController],
  providers: [SourcesService, PrismaService],
  exports: [SourcesService],
})
export class DatabaseModule {}
