import {
  IsByteLength,
  IsDefined,
  IsHexadecimal,
  IsString,
} from 'class-validator';
import { SourceDto } from '../../database/radiosource/dto/radiosource.dto';

export class RadioApiAuthDto {
  @IsByteLength(12)
  @IsHexadecimal()
  api_key: string;

  @IsString()
  api_secret: string;
}

export class CreateAuthRadioDto {
  @IsString()
  description: string;

  @IsDefined()
  source: SourceDto;
}
