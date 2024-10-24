import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RadioSourceModule } from '../database/radiosource/radiosource.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [RadioSourceModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
