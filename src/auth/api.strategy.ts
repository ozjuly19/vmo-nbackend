import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class ApiStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(api_secret: string): Promise<any> {
    const user = await this.authService.verifyApiAuthN(api_secret);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
