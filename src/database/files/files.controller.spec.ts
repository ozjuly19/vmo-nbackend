import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('FilesController', () => {
  let controller: FilesController;
  let prisma: DeepMockProxy<PrismaClient>;

  const testObject = {
    id: 'testid-uuid',
    filename: 'testing',
    file_size: 50,
    mime_type: 'audio/mpeg',
    created_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [FilesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<FilesController>(FilesController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of files', async () => {
    const testObjects = [testObject];
    prisma.files.findMany.mockResolvedValue(testObjects);

    const files = await controller.findAll();
    expect(files).toEqual(testObjects);
  });

  it('should return a single file', async () => {
    prisma.files.findUnique.mockResolvedValue(testObject);

    const file = await controller.findOne('1');
    expect(file).toEqual(testObject);
  });

  it('should upfile a single file', async () => {
    prisma.files.update.mockResolvedValue(testObject);

    const file = await controller.update('testid-uuid', testObject);
    expect(file).toEqual(testObject);
  });

  it('should create a single file in the db', async () => {
    prisma.files.create.mockResolvedValue(testObject);

    const file = await controller.create(testObject);
    expect(file).toEqual(testObject);
  });

  // it('should delete a single file', async () => {
  //   prisma.files.delete.mockResolvedValue(testObject);

  //   const file = await controller.remove('testid-uuid');
  //   expect(file).toEqual(testObject);
  // });
});
