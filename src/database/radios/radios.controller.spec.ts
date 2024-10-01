import { Test, TestingModule } from '@nestjs/testing';
import { RadiosController } from './radios.controller';
import { RadiosService } from './radios.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client'
import { mockDeep, DeepMockProxy } from 'jest-mock-extended'

describe('RadiosController', () => {
  let controller: RadiosController;
  let prisma: DeepMockProxy<PrismaClient>;

  const testObject = { api_key: 'test-uuid', api_secret: 'secret', source_id: 'testid-uuid', last_heartbeat: new Date(), description: 'test' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadiosController],
      providers: [RadiosService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<RadiosController>(RadiosController);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of radios', async () => {
    const testObjects = [testObject];
    prisma.radios.findMany.mockResolvedValue(testObjects);

    const radios = await controller.findAll();
    expect(radios).toEqual(testObjects);
  });

  it('should return a single radio', async () => {
    prisma.radios.findUnique.mockResolvedValue(testObject);

    const radio = await controller.findOne('1');
    expect(radio).toEqual(testObject);
  });

  it('should upradio a single radio', async () => {
    prisma.radios.update.mockResolvedValue(testObject);

    const radio = await controller.update('testid-uuid', testObject);
    expect(radio).toEqual(testObject);
  });

  it('should create a single radio in the db', async () => {
    prisma.radios.create.mockResolvedValue(testObject);

    const radio = await controller.create(testObject);
    expect(radio).toEqual(testObject);
  });

  it('should delete a single radio', async () => {
    prisma.radios.delete.mockResolvedValue(testObject);

    const radio = await controller.remove('testid-uuid');
    expect(radio).toEqual(testObject);
  });

});
