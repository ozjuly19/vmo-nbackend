import { Module } from '@nestjs/common';
import { DatesModule } from './dates/dates.module';
import { PrismaModule } from './prisma/prisma.module';
import { SourcesModule } from './sources/sources.module';
import { ClipsModule } from './clips/clips.module';
import { FilesModule } from './files/files.module';
import { RadiosModule } from './radios/radios.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    DatesModule,
    SourcesModule,
    PrismaModule,
    ClipsModule,
    FilesModule,
    RadiosModule
  ],
})

export class DatabaseModule { }