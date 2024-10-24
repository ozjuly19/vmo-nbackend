import { IsByteLength, IsHexadecimal, IsString } from 'class-validator';

export class RadioApiAuthDto {
  @IsByteLength(12)
  @IsHexadecimal()
  api_key: string;

  @IsString()
  api_secret: string;
}

export class CreateApiRadioDto {
  @IsByteLength(12)
  @IsHexadecimal()
  source_id: string;

  @IsString()
  description: string;
}
