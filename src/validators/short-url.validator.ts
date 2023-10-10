import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength } from 'class-validator';

export class ShortUrlValidator {
  @ApiProperty({ example: 'https://github.com/danielveloso97/url-shortener' })
  @IsUrl()
  longUrl: string;

  @ApiProperty({
    example: 'Project url to shorten url using Nest.js',
  })
  @IsString()
  @MaxLength(100)
  title: string;
}
