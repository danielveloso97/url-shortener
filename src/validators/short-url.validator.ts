import { IsString, IsUrl, MaxLength } from 'class-validator';

export class ShortUrlValidator {
  @IsUrl()
  longUrl: string;

  @IsString()
  @MaxLength(100)
  title: string;
}
