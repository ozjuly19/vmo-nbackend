import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClipsService } from './clips.service';
import { Clips as ClipsModel } from '@prisma/client';
import { CreateClipDto, DeleteOldClipsDto } from './dto/clips.dto';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  // Uplaoading a clip
  @Post('upload')
  @UseInterceptors(FileInterceptor('clipFile'))
  async create(
    @Body() data: CreateClipDto,
    @UploadedFile() clipFile: Express.Multer.File,
  ) {
    return this.clipsService.uploadClip(data, clipFile);
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

  @Delete('fromDateAndOlder/:date')
  async deleteClipsFromDateAndOlder(@Param() data: DeleteOldClipsDto) {
    return this.clipsService.deleteClipsFromDateAndOlder(new Date(data.date));
  }

  // Not safe for production
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.clipsService.remove({ id });
  // }
}
