import { Transform } from 'class-transformer';
import { Matches, IsNotEmpty, IsDate } from 'class-validator';

export class CreateClipDto {
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)
  time: string;
}

export class DeleteOldClipsDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;
}
