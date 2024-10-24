import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RadioSourceModule } from '../database/radiosource/radiosource.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [RadioSourceModule],
})
export class AuthModule {}
