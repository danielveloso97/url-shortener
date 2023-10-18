import { Url } from '../entities/url.entity';
import {
  Injectable,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { UrlProvider } from '../database/url.providers';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class RegisterShortUrl {
  constructor(
    @Inject(UrlProvider.name)
    private urlRepository: UrlRepository,
    private configService: ConfigService,
  ) {}
  async execute(longUrl: string, title: string): Promise<Url> {
    const urlIsValid = isURL(longUrl);
    if (!urlIsValid) {
      throw new UnprocessableEntityException('A Url Não é Válida');
    }
    const code = nanoid(8);
    const shortUrl = `${this.configService.getOrThrow('BASE_URL')}/${code}`;
    const url = {
      title: title,
      longUrl: longUrl,
      shortUrl: shortUrl,
      code: code,
    };
    const savedIdUrl = this.urlRepository.create(url); //metódo create
    return savedIdUrl;
  }
}
