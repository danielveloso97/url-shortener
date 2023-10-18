import { CreateShortUrlDto } from '../../src/dtos/create-short-url-dto';
import { Url } from '../../src/entities/url.entity';
import { UrlMock } from './url.mock';

export class UrlRepository {
  private urls: Url[] = UrlMock;

  public async create(data: CreateShortUrlDto) {
    const url = new Url();
    Object.assign(url, { id: this.urls.length + 1, ...data });
    return url;
  }

  public async save(url: Url) {
    this.urls.push(url);
  }

  public async find() {
    return this.urls;
  }

  public async findOne(code: string) {
    return this.urls.find((url) => url.code === code);
  }

  public async delete(code: string) {
    const index = this.urls.findIndex((url) => url.code === code);
    this.urls.splice(index);
  }
}
