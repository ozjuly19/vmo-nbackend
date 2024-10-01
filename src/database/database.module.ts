import { Module } from '@nestjs/common';
import { DatesModule } from './dates/dates.module';
import { PrismaModule } from './prisma/prisma.module';
import { SourcesModule } from './sources/sources.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    DatesModule,
    SourcesModule,
    PrismaModule
  ],
})

export class DatabaseModule { }