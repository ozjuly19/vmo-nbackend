import { Test, TestingModule } from '@nestjs/testing';
import { ClipsService } from './clips.service';
import { PrismaService } from '../prisma/prisma.service';
import { DatesService } from '../dates/dates.service';
import { RadioSourceService } from '../radiosource/radiosource.service';

describe('ClipsService', () => {
  let service: ClipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClipsService,
        PrismaService,
        DatesService,
        RadioSourceService,
      ],
    }).compile();

    service = module.get<ClipsService>(ClipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
