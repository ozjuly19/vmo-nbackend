import { Test, TestingModule } from '@nestjs/testing';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('SourcesController', () => {
  let controller: SourcesController;
  let prisma: DeepMockProxy<PrismaClient>;

  const testObject = {
    id: 'testid-uuid',
    name: 'name',
    shorthand: 'shorthand',
    timezone: 'America/Denver',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SourcesController],
      providers: [SourcesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<SourcesController>(SourcesController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of sources', async () => {
    const testObjects = [testObject];
    prisma.sources.findMany.mockResolvedValue(testObjects);

    const sources = await controller.findAll();
    expect(sources).toEqual(testObjects);
  });

  it('should return a single source', async () => {
    prisma.sources.findUnique.mockResolvedValue(testObject);

    const source = await controller.findOne('1');
    expect(source).toEqual(testObject);
  });

  it('should update a single source', async () => {
    prisma.sources.update.mockResolvedValue(testObject);

    const source = await controller.update('testid-uuid', testObject);
    expect(source).toEqual(testObject);
  });

  it('should create a single source in the db', async () => {
    prisma.sources.create.mockResolvedValue(testObject);

    const source = await controller.create(testObject);
    expect(source).toEqual(testObject);
  });

  it('should delete a single source', async () => {
    prisma.sources.delete.mockResolvedValue(testObject);

    const source = await controller.remove('testid-uuid');
    expect(source).toEqual(testObject);
  });
});
