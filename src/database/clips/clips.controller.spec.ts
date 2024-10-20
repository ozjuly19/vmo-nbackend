import { Test, TestingModule } from '@nestjs/testing';
import { ClipsController } from './clips.controller';
import { ClipsService } from './clips.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('ClipsController', () => {
  let controller: ClipsController;
  let prisma: DeepMockProxy<PrismaClient>;

  const testObject = {
    id: 'testid-uuid',
    time: '02-22-40',
    file_id: 'testid-uuid',
    date_id: 'testid-uuid',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClipsController],
      providers: [ClipsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<ClipsController>(ClipsController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of clips', async () => {
    const testObjects = [testObject];
    prisma.clips.findMany.mockResolvedValue(testObjects);

    const clips = await controller.findAll();
    expect(clips).toEqual(testObjects);
  });

  it('should return a single clip', async () => {
    prisma.clips.findUnique.mockResolvedValue(testObject);

    const clip = await controller.findOne('1');
    expect(clip).toEqual(testObject);
  });

  it('should upclip a single clip', async () => {
    prisma.clips.update.mockResolvedValue(testObject);

    const clip = await controller.update('testid-uuid', testObject);
    expect(clip).toEqual(testObject);
  });

  it('should create a single clip in the db', async () => {
    prisma.clips.create.mockResolvedValue(testObject);

    const clip = await controller.create(testObject);
    expect(clip).toEqual(testObject);
  });

  it('should delete a single clip', async () => {
    prisma.clips.delete.mockResolvedValue(testObject);

    const clip = await controller.remove('testid-uuid');
    expect(clip).toEqual(testObject);
  });
});
