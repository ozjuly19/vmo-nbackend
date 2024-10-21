import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { FilesService } from './files.service';
import { Files as FilesModel } from '@prisma/client';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async create(@Body() data: FilesModel) {
    return this.filesService.create(data);
  }

  @Get()
  async findAll() {
    return this.filesService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.filesService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: FilesModel) {
    return this.filesService.update({ where: { id }, data });
  }

  // Not safe for production
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.filesService.remove({ id });
  // }
}
