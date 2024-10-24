import { Test, TestingModule } from '@nestjs/testing';
import { RadioSourceController } from './radiosource.controller';
import { RadioSourceService } from './radiosource.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('SourcesController', () => {
  let controller: RadioSourceController;
  let prisma: DeepMockProxy<PrismaClient>;

  const testObject = {
    id: 'testid',
    api_secret: 'testsecret',
    last_heartbeat: new Date(),
    description: 'description',
    source: {
      id: 'testid',
      name: 'name',
      shorthand: 'shorthand',
      timezone: 'America/Denver',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadioSourceController],
      providers: [RadioSourceService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<RadioSourceController>(RadioSourceController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of radioSource', async () => {
    const testObjects = [testObject];
    prisma.radioSource.findMany.mockResolvedValue(testObjects);

    const radioSource = await controller.findAll();
    expect(radioSource).toEqual(testObjects);
  });

  it('should return a single source', async () => {
    prisma.radioSource.findUnique.mockResolvedValue(testObject);

    const source = await controller.findOne('1');
    expect(source).toEqual(testObject);
  });

  it('should update a single source', async () => {
    prisma.radioSource.update.mockResolvedValue(testObject);

    const source = await controller.update('testid-uuid', testObject);
    expect(source).toEqual(testObject);
  });

  // it('should create a single source in the db', async () => {
  //   prisma.radioSource.create.mockResolvedValue(testObject);

  //   const source = await controller.create(testObject);
  //   expect(source).toEqual(testObject);
  // });

  it('should delete a single source', async () => {
    prisma.radioSource.delete.mockResolvedValue(testObject);

    const source = await controller.remove('testid-uuid');
    expect(source).toEqual(testObject);
  });
});
