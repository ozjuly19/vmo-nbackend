import { Injectable } from '@nestjs/common';
import { Dates, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RadioSourceService } from '../radiosource/radiosource.service';

@Injectable()
export class DatesService {
  constructor(
    private prisma: PrismaService,
    private radioSourceService: RadioSourceService,
  ) {}

  async createNow(radio_source_id: string): Promise<Dates> {
    // Get the radioSource by id
    const radioSource = await this.radioSourceService.findOne({
      id: radio_source_id,
    });

    // Throw an error if the radioSource is not found
    if (!radioSource) throw new Error('Radio source not found with given id!');

    // Get the current date in the format YYYY-MM-DD
    const display_date = new Date().toLocaleDateString('en-US', {
      timeZone: radioSource.source.timezone,
    });

    // Query the database to see if the dbDate already exists
    const dbDate = await this.prisma.dates.findFirst({
      where: { display_date, radio_source_id },
    });

    // Break early if the dbDate is found
    if (dbDate) {
      return dbDate;
    }

    // Construct the new date object
    const newDate = {
      display_date,
      radio_source_id,
    } as Prisma.DatesCreateInput;

    // Create it and return it
    return this.create(newDate);
  }

  async create(data: Prisma.DatesCreateInput): Promise<Dates> {
    return this.prisma.dates.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DatesWhereUniqueInput;
    where?: Prisma.DatesWhereInput;
    orderBy?: Prisma.DatesOrderByWithRelationInput;
  }): Promise<Dates[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.dates.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.DatesWhereUniqueInput): Promise<Dates | null> {
    return this.prisma.dates.findUnique({ where });
  }

  async update(params: {
    where: Prisma.DatesWhereUniqueInput;
    data: Prisma.DatesUpdateInput;
  }): Promise<Dates> {
    const { where, data } = params;
    return this.prisma.dates.update({ where, data });
  }

  async remove(where: Prisma.DatesWhereUniqueInput): Promise<Dates> {
    return this.prisma.dates.delete({ where });
  }
}

{
  {
    new Date().toLocaleDateString('en-US', { timeZone: 'America/Denver' }); //?
  }
}
