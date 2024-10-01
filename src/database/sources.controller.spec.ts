import { Test, TestingModule } from '@nestjs/testing';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from './prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

describe('SourcesController', () => {
  let controller: SourcesController;
  let prisma: DeepMockProxy<PrismaClient>;

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
    const testSources = [{ id: 'testid-uuid', name: 'name', shorthand: 'shorthand', timezone: 'America/Denver' }];
    prisma.sources.findMany.mockResolvedValue(testSources);

    const sources = await controller.findAllSources();
    expect(sources).toEqual(testSources);
  });

  it('should return a single source', async () => {
    const testSource = { id: 'testid-uuid', name: 'name', shorthand: 'shorthand', timezone: 'America/Denver' };
    prisma.sources.findUnique.mockResolvedValue(testSource);

    const source = await controller.findOneSource('1');
    expect(source).toEqual(testSource);
  });

  it('should update a single source', async () => {
    const testSource = { id: 'testid-uuid', name: 'name', shorthand: 'shorthand', timezone: 'America/Denver' };
    prisma.sources.update.mockResolvedValue(testSource);

    const source = await controller.updateSource('testid-uuid', testSource);
    expect(source).toEqual(testSource);
  });

  it('should create a single source in the db', async () => {
    const testSource = { id: 'testid-uuid', name: 'name', shorthand: 'shorthand', timezone: 'America/Denver' };
    prisma.sources.create.mockResolvedValue(testSource);

    const source = await controller.createSource(testSource);
    expect(source).toEqual(testSource);
  });

  it('should delete a single source', async () => {
    const testSource = { id: 'testid-uuid', name: 'name', shorthand: 'shorthand', timezone: 'America/Denver' };
    prisma.sources.delete.mockResolvedValue(testSource);

    const source = await controller.removeSource('testid-uuid');
    expect(source).toEqual(testSource);
  });
});