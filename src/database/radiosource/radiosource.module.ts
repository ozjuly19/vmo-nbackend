import { Module } from '@nestjs/common';
import { RadioSourceService } from './radiosource.service';
import { RadioSourceController } from './radiosource.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RadioSourceController],
  providers: [RadioSourceService],
  imports: [PrismaModule],
  exports: [RadioSourceService],
})
export class RadioSourceModule {}
