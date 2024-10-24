import { Test, TestingModule } from '@nestjs/testing';
import { RadioSourceService } from './radiosource.service';
import { PrismaService } from '../prisma/prisma.service';

describe('RadioSourceService', () => {
  let service: RadioSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadioSourceService, PrismaService],
    }).compile();

    service = module.get<RadioSourceService>(RadioSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
