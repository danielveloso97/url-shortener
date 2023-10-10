import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, MaxLength } from 'class-validator';

export class UrlModel {
  @ApiProperty({ example: 'https://github.com/danielveloso97/url-shortener' })
  @IsUrl()
  longUrl: string;

  @ApiProperty({
    example: 'Project url to shorten url using Nest.js',
  })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Unique ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Url shorted' })
  @IsUrl()
  shortUrl: string;

  @ApiProperty({ example: 'Code references of URL' })
  @IsString()
  code: string;
}
