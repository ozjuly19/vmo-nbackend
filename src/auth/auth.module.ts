import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RadioSourceModule } from '../database/radiosource/radiosource.module';
import { PassportModule } from '@nestjs/passport';
import { ApiStrategy } from './api.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ApiStrategy],
  imports: [RadioSourceModule, PassportModule],
})
export class AuthModule {}
