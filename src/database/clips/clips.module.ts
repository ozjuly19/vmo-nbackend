import { Module } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FilesService } from '../files/files.service';
import { DatesService } from '../dates/dates.service';

@Module({
  controllers: [ClipsController],
  providers: [ClipsService, FilesService, DatesService],
  imports: [PrismaModule],
  exports: [ClipsService],
})
export class ClipsModule {}
