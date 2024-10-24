import { Transform } from 'class-transformer';
import { Matches, IsNotEmpty, IsDate } from 'class-validator';

export class CreateClipDto {
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
  display_time: string;
}

export class DeleteOldClipsDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  display_date: Date;
}
