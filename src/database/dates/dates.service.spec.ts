import { Test, TestingModule } from '@nestjs/testing';
import { DatesService } from './dates.service';
import { RadioSourceService } from '../radiosource/radiosource.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DatesService', () => {
  let service: DatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatesService, RadioSourceService, PrismaService],
    }).compile();

    service = module.get<DatesService>(DatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
