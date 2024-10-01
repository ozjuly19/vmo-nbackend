import { Module } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ClipsController],
  providers: [ClipsService],
  imports: [PrismaModule],
})
export class ClipsModule {}
