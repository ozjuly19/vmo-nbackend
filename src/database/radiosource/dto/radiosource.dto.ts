import { IsDefined, IsString, IsTimeZone } from 'class-validator';

export class SourceDto {
  @IsString()
  name: string;

  @IsString()
  shorthand: string;

  @IsString()
  @IsTimeZone()
  timezone: string;
}

export class CreateRadioSourceDto {
  @IsString()
  api_secret: string;

  @IsString()
  description: string;

  @IsDefined()
  source: SourceDto;
}
