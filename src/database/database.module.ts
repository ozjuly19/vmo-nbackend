import { Module } from '@nestjs/common';
import { DatesModule } from './dates/dates.module';
import { PrismaModule } from './prisma/prisma.module';
import { SourcesModule } from './sources/sources.module';
import { ClipsModule } from './clips/clips.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    DatesModule,
    SourcesModule,
    PrismaModule,
    ClipsModule
  ],
})

export class DatabaseModule { }