import { Test, TestingModule } from '@nestjs/testing';
import { DatesController } from './dates.controller';
import { DatesService } from './dates.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('DatesController', () => {
  let controller: DatesController;
  let prisma: DeepMockProxy<PrismaClient>;

  const testObject = {
    id: 'testid-uuid',
    display_date: '2021-01-01',
    created_dt: new Date(),
    source_id: 'test-uuid',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatesController],
      providers: [DatesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<DatesController>(DatesController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of dates', async () => {
    const testObjects = [testObject];
    prisma.dates.findMany.mockResolvedValue(testObjects);

    const dates = await controller.findAll();
    expect(dates).toEqual(testObjects);
  });

  it('should return a single date', async () => {
    prisma.dates.findUnique.mockResolvedValue(testObject);

    const date = await controller.findOne('1');
    expect(date).toEqual(testObject);
  });

  it('should update a single date', async () => {
    prisma.dates.update.mockResolvedValue(testObject);

    const date = await controller.update('testid-uuid', testObject);
    expect(date).toEqual(testObject);
  });

  it('should create a single date in the db', async () => {
    prisma.dates.create.mockResolvedValue(testObject);

    const date = await controller.create(testObject);
    expect(date).toEqual(testObject);
  });

  it('should delete a single date', async () => {
    prisma.dates.delete.mockResolvedValue(testObject);

    const date = await controller.remove('testid-uuid');
    expect(date).toEqual(testObject);
  });
});
