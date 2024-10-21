import { Injectable } from '@nestjs/common';
import { Clips, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { FilesService } from '../files/files.service';
import { DatesService } from '../dates/dates.service';
import { CreateClipDto } from './dto/clips.dto';

@Injectable()
export class ClipsService {
  constructor(
    private prisma: PrismaService,
    private filesService: FilesService,
    private datesService: DatesService,
  ) {}

  // Delete all clips, file_id records, and fs data for clips older than the specified EPOCH time
  async deleteClipsFromDateAndOlder(olderThan: Date): Promise<string> {
    // Find all files older than the specified EPOCH time
    const files = await this.filesService.findAll({
      where: { created_at: { lt: olderThan.toISOString() } },
    });

    // Find all clips referencing the files
    const clips = await this.findAll({
      where: { file_id: { in: files.map((file) => file.id) } },
    });

    // Delete all clips, file_id records, and fs data for clips older than the specified EPOCH time
    for (const clip of clips) {
      await this.remove(clip);
      await this.filesService.remove(
        files.find((file) => file.id === clip.file_id) ?? { id: clip.file_id },
      );
    }

    // Delete empty date records
    // Get list of date_ids from olderThan date and older
    // Query the database for the count of clips for each date_id
    const dateIds = await this.datesService
      .findAll({ where: { date: { lt: olderThan } } })
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

    const source_id = '4eb47037-651a-4b3a-8c6b-09fe6aacdbd0'; // TODO: source_id should be dynamic and grabbed from the request via radio auth

    // Create date if needed
    const dbDate = await this.datesService.createNow(source_id);

    // Create file in the database
    const dbFile = await this.filesService.writeFileToDiskAndCreate(
      {
        filename: `${dbDate.date.toISOString().split('T')[0]}@${createClipData.time}`,
        file_size: clipFile.size,
        mime_type: clipFile.mimetype,
      },
      clipFile.buffer,
    );

    // Construct data with file_id and date_id
    const data = {
      time: createClipData.time,
      file_id: dbFile.id,
      date_id: dbDate.id,
    } as Prisma.ClipsCreateInput;

    // Create clip in the database
    const dbClip = this.create(data);

    return dbClip;
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

{
  {
    const p = new PrismaService();
    const f = new FilesService(p);
    const d = new DatesService(p);

    const a = new ClipsService(p, f, d);

    a.deleteClipsFromDateAndOlder(new Date());
  }
}
