import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { RadioApiAuthDto } from './dto/auth.dto';
import { CreateAuthRadioDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login/radio')
  // async radioApiCheck(@Body() radioApiAuthDto: RadioApiAuthDto) {
  //   const { api_key, api_secret } = radioApiAuthDto;
  //   return (await this.authService.verifyApiAuthN(api_key, api_secret))
  //     ? 'Authorized'
  //     : new UnauthorizedException('Invalid API Key or Secret');
  // }

  @Post('register/radio')
  async radioApiRegister(@Body() regestierRadioApiDto: CreateAuthRadioDto) {
    return await this.authService.registerNewRadio(regestierRadioApiDto);
  }
}
