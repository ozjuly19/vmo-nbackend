import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

describe('PrismaService', () => {
    let service: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PrismaService],
        }).compile();

        service = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should be an instance of PrismaClient', () => {
        expect(service).toBeInstanceOf(PrismaClient);
    });

    it('should connect to the database on module init', async () => {
        const connectSpy = jest.spyOn(service, '$connect').mockResolvedValue();
        await service.onModuleInit();
        expect(connectSpy).toHaveBeenCalled();
    });
});