import { Module } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DatesService } from '../dates/dates.service';
import { RadioSourceService } from '../radiosource/radiosource.service';

@Module({
  controllers: [ClipsController],
  providers: [ClipsService, DatesService, RadioSourceService],
  imports: [PrismaModule],
  exports: [ClipsService],
})
export class ClipsModule {}
