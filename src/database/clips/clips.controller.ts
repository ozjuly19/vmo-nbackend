import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import { Clips as ClipsModel } from '@prisma/client';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  async create(@Body() data: ClipsModel) {
    return this.clipsService.create(data);
  }

  @Get()
  async findAll() {
    return this.clipsService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clipsService.findOne({ id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: ClipsModel) {
    return this.clipsService.update({ where: { id }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clipsService.remove({ id });
  }
}
