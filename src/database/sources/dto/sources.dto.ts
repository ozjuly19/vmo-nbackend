import { IsString, IsTimeZone } from 'class-validator';

export class CreateSourceDto {
  @IsString()
  name: string;

  @IsString()
  shorthand: string;

  @IsString()
  @IsTimeZone()
  timezone: string;
}
