import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { PrismaService } from './prisma.service';
import { SourcesController } from './sources.controller';

@Module({
  controllers: [SourcesController],
  providers: [SourcesService, PrismaService],
  exports: [SourcesService],
})
export class DatabaseModule {}
