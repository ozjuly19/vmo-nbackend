import { Injectable } from '@nestjs/common';
import { Clips, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DatesService } from '../dates/dates.service';
import { CreateClipDto } from './dto/clips.dto';
import { writeFileSync } from 'fs';

@Injectable()
export class ClipsService {
  constructor(
    private prisma: PrismaService,
    private datesService: DatesService,
  ) {}

  // Delete all clips, file_id records, and fs data for clips older than the specified time
  async deleteClipsFromDateAndOlder(olderThan: Date): Promise<string> {
    // Find all clips older than the specified time
    const clips = await this.findAll({
      where: { created_dt: { lt: olderThan.toISOString() } },
    });

    // Delete all clips and fs data for clips older than the specified time
    for (const clip of clips) {
      await this.remove(clip);
    }

    // Delete empty date records
    // Get list of date_ids from olderThan date and older
    // Query the database for the count of clips for each date_id
    const dateIds = await this.datesService
      .findAll({ where: { created_dt: { lt: olderThan } } })
      .then((dates) => dates.map((date) => date.id));

    const dateCounts = await this.prisma.clips.groupBy({
      by: ['date_id'],
      _count: { id: true },
      where: { date_id: { in: dateIds } },
    });

    // Filter out the date_ids that have clips
    const emptyDateIds = dateIds.filter(
      (dateId) => !dateCounts.find((dateCount) => dateCount.date_id === dateId),
    );

    // Delete the date records
    for (const dateId of emptyDateIds) {
      await this.datesService.remove({ id: dateId });
    }

    return `Deleted ${clips.length} clips older than ${olderThan}.${emptyDateIds.length > 0 ? `\nDeleted ${emptyDateIds.length} new empty date record(s)` : ``}`;
  }

  async create(data: Prisma.ClipsCreateInput): Promise<Clips> {
    return this.prisma.clips.create({ data });
  }

  async uploadClip(
    createClipData: CreateClipDto,
    clipFile: Express.Multer.File,
  ): Promise<Clips> {
    // Do validations
    this._validateClipFile(clipFile);

    const radio_source_id = '671aad566a8f653b7b401a57'; // TODO: radio_source_id should be dynamic and grabbed from the request via radio auth

    // Create date if needed
    const dbDate = await this.datesService.createNow(radio_source_id);

    // Serialize the new file name
    const new_file_name =
      `${dbDate.display_date}_at_${createClipData.display_time}`
        .replaceAll('/', '-')
        .replaceAll(':', '-');

    // Create file in the database
    const fsFile = await this.writeFileToDiskAndCreate(
      {
        name: new_file_name,
        size: clipFile.size,
        mime_type: clipFile.mimetype,
      },
      clipFile.buffer,
    );

    // Construct data with file_id and date_id
    const data = {
      display_time: createClipData.display_time,
      date_id: dbDate.id,
      file: fsFile,
    } as Prisma.ClipsCreateInput;

    // Create clip in the database
    const dbClip = this.create(data);

    return dbClip;
  }

  // Create file in the connected fs and return the metadata
  async writeFileToDiskAndCreate(
    data: Prisma.FileCreateInput,
    buffer: Buffer,
  ): Promise<Prisma.FileCreateInput> {
    // Make sure data.name is an allowed file name
    if (!data.name.match(/^[a-zA-Z0-9-_]+$/)) {
      throw new Error(`Invalid file name: "${data.name}"`);
    }

    writeFileSync(`${process.env.UPLOAD_PATH}/${data.name}`, buffer);

    return data;
  }

  _validateClipFile(clipFile: Express.Multer.File) {
    // Just check if there is a buffer object
    if (clipFile?.buffer) {
      return true;
    }

    throw new Error('clipFile is invalid!');
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClipsWhereUniqueInput;
    where?: Prisma.ClipsWhereInput;
    orderBy?: Prisma.ClipsOrderByWithRelationInput;
  }): Promise<Clips[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.clips.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.ClipsWhereUniqueInput): Promise<Clips | null> {
    return this.prisma.clips.findUnique({ where });
  }

  // Get all clips for a specific date_id
  async findAllByDateId(date_id: string): Promise<Clips[]> {
    return this.findAll({ where: { date_id } });
  }

  async update(params: {
    where: Prisma.ClipsWhereUniqueInput;
    data: Prisma.ClipsUpdateInput;
  }): Promise<Clips> {
    const { where, data } = params;
    return this.prisma.clips.update({ where, data });
  }

  async remove(where: Prisma.ClipsWhereUniqueInput): Promise<Clips> {
    return this.prisma.clips.delete({ where });
  }
}
