import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RadiosService } from './radios.service';
import { Radios as RadiosModel } from '@prisma/client';

@Controller('radios')
export class RadiosController {
  constructor(private readonly radiosService: RadiosService) {}

  @Post()
  async create(@Body() data: RadiosModel) {
    return this.radiosService.create(data);
  }

  @Get()
  async findAll() {
    return this.radiosService.findAll({});
  }

  @Get(':api_key')
  async findOne(@Param('api_key') api_key: string) {
    return this.radiosService.findOne({ api_key });
  }

  @Patch(':api_key')
  async update(@Param('api_key') api_key: string, @Body() data: RadiosModel) {
    return this.radiosService.update({ where: { api_key }, data });
  }

  @Delete(':api_key')
  async remove(@Param('api_key') api_key: string) {
    return this.radiosService.remove({ api_key });
  }
}
