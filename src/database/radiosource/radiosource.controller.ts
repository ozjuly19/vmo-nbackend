import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { RadioSourceService } from './radiosource.service';
import { RadioSource as RadioSourceModel } from '@prisma/client';
// import { CreateRadioSourceDto } from './dto/radiosource.dto';

@Controller('radiosource')
export class RadioSourceController {
  constructor(private readonly radioSourceService: RadioSourceService) {}

  // Probably shouldn't be in production due to auth service being the main creator of radio sources now
  // @Post()
  // async create(@Body() data: CreateRadioSourceDto): Promise<RadioSourceModel> {
  //   return this.radioSourceService.create(data);
  // }

  @Get()
  async findAll(): Promise<RadioSourceModel[]> {
    return this.radioSourceService.findAll({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RadioSourceModel | null> {
    return this.radioSourceService.findOne({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: RadioSourceModel,
  ): Promise<RadioSourceModel> {
    return this.radioSourceService.update({ where: { id }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RadioSourceModel> {
    return this.radioSourceService.remove({ id });
  }
}
