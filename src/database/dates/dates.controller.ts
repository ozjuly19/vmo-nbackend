import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatesService } from './dates.service';

@Controller('dates')
export class DatesController {
  constructor(private readonly datesService: DatesService) {}

  @Post()
  create(@Body() createDateDto) {
    return this.datesService.create(createDateDto);
  }

  @Get()
  findAll() {
    return this.datesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDateDto) {
    return this.datesService.update(+id, updateDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datesService.remove(+id);
  }
}
