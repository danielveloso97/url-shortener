import { CreateShortUrlDto } from '../../src/dtos/create-short-url-dto';
import { Url } from '../../src/entities/url.entity';

export class UrlRepository {
  private urls: Url[] = [];

  public async create(data: CreateShortUrlDto) {
    const url = new Url();
    Object.assign(url, { id: this.urls.length + 1, ...data });
    return url;
  }

  public async save(url: Url) {
    this.urls.push(url);
  }
}
