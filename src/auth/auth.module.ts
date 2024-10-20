import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RadiosModule } from '../database/radios/radios.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [RadiosModule],
})
export class AuthModule {}
