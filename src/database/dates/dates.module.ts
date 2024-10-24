import { Module } from '@nestjs/common';
import { DatesService } from './dates.service';
import { DatesController } from './dates.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RadioSourceModule } from '../radiosource/radiosource.module';

@Module({
  controllers: [DatesController],
  providers: [DatesService],
  imports: [PrismaModule, RadioSourceModule],
  exports: [DatesService],
})
export class DatesModule {}
