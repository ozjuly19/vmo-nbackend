import { Module } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourcesController } from './sources.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SourcesController],
  providers: [SourcesService],
  imports: [PrismaModule],
  exports: [SourcesService],
})
export class SourcesModule {}
