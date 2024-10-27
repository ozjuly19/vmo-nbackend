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
  UseGuards,
  Request,
  Headers,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClipsService } from './clips.service';
import { Clips as ClipsModel } from '@prisma/client';
import { CreateClipDto, DeleteOldClipsDto } from './dto/clips.dto';
import { ApiAuthGuard } from '../../auth/api-auth.guard';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  // Uplaoading a clip
  @UseGuards(ApiAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Headers() data: CreateClipDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    if (!req.user) {
      throw new Error('Invalid user');
    }
    return this.clipsService.uploadClip(data, file, req.user);
  }

  @Get()
  async findAll() {
    return this.clipsService.findAll({});
  }

  @Get('by-date/:id')
  async findByDate(@Param('id') id: string) {
    return this.clipsService.findAll({ where: { date_id: id } });
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
    return this.clipsService.deleteClipsFromDateAndOlder(
      new Date(data.display_date),
    );
  }

  // Not safe for production
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.clipsService.remove({ id });
  // }
}
