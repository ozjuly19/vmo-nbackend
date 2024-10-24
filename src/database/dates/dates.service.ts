import { Injectable } from '@nestjs/common';
import { Dates, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatesService {
  constructor(private prisma: PrismaService) {}

  async createNow(source_id: string): Promise<Dates> {
    // Get the source timezone
    const source = await this.prisma.sources.findUnique({
      where: { id: source_id },
    });

    // Throw an error if the source is not found
    if (!source) throw new Error('Source not found with given id!');

    // Get the current date in the format YYYY-MM-DD
    const display_date = new Date().toLocaleDateString('en-US', {
      timeZone: source.timezone,
    });

    // Query the database to see if the dbDate already exists
    const dbDate = await this.prisma.dates.findFirst({
      where: { display_date, source_id },
    });

    // Break early if the dbDate is found
    if (dbDate) {
      return dbDate;
    }

    // Construct the new date object
    const newDate = {
      display_date,
      source_id,
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
