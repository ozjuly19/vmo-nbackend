import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { Sources as SourcesModel } from '@prisma/client';

@Controller('sources')
export class SourcesController {
  constructor(private readonly sourcesService: SourcesService) { }

  @Post()
  async create(@Body() data: SourcesModel): Promise<SourcesModel> {
    return this.sourcesService.create(data);
  }

  @Get()
  async findAll(): Promise<SourcesModel[]> {
    return this.sourcesService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SourcesModel | null> {
    return this.sourcesService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: SourcesModel
  ): Promise<SourcesModel> {
    return this.sourcesService.update({ where: { id }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SourcesModel> {
    return this.sourcesService.remove({ id });
  }
}
