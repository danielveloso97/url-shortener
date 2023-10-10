import { Repository } from 'typeorm';
import { Url } from 'src/entities/url.entity';
import {
  Injectable,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class RegisterShortUrl {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}
  async execute(longUrl: string, title: string): Promise<Url> {
    //1 Receber a URL, 2 Encurtar, 3 Devolver a URl encurtada
    const urlIsValid = isURL(longUrl);
    if (!urlIsValid) {
      throw new UnprocessableEntityException('A Url Não é Válida');
    }
    const code = nanoid(8);
    const shortUrl = `http://localhost:3000/${code}`;
    const url = {
      title: title,
      longUrl: longUrl,
      shortUrl: shortUrl,
      code: code,
    };
    const savedIdUrl = this.urlRepository.create(url);
    await this.urlRepository.save(savedIdUrl);
    return savedIdUrl;
  }
}