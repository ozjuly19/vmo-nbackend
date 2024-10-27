import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DatesService } from './dates.service';
import { Dates as DatesModel } from '@prisma/client';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @Post()
  async create(@Body() data: DatesModel): Promise<DatesModel> {
    return this.datesService.create(data);
  }

  @Get()
  async findAll(): Promise<DatesModel[]> {
    return this.datesService.findAll({});
  }

  @Get('by-source/:id')
  async findBySource(@Param('id') id: string): Promise<DatesModel[]> {
    return this.datesService.findAll({ where: { radio_source_id: id } });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DatesModel | null> {
    return this.datesService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: DatesModel,
  ): Promise<DatesModel> {
    return this.datesService.update({ where: { id }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DatesModel> {
    return this.datesService.remove({ id });
  }
}
