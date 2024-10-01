import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { Sources as SourcesModel } from '@prisma/client';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) { }

  @Post()
  async createSource(@Body() data: SourcesModel): Promise<SourcesModel> {
    return this.sourcesService.createSource(data);
  }

  @Get()
  async findAllSources(): Promise<SourcesModel[]> {
    return this.sourcesService.sources({});
  }

  @Get(':id')
  async findOneSource(@Param('id') id: string): Promise<SourcesModel | null> {
    return this.sourcesService.source({ id });
  }

  @Patch(':id')
  async updateSource(
    @Param('id') id: string,
    @Body() data: SourcesModel
  ): Promise<SourcesModel> {
    return this.sourcesService.updateSource({ where: { id }, data });
  }

  @Delete(':id')
  async removeSource(@Param('id') id: string): Promise<SourcesModel> {
    return this.sourcesService.removeSource({ id });
  }
}
