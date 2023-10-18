import { CreateShortUrlDto } from 'src/dtos/create-short-url-dto';
import { Url } from 'src/entities/url.entity';

export interface UrlRepository {
  create(data: CreateShortUrlDto): Promise<Url>;
  find(): Promise<Url[]>;
  findOne(code: string): Promise<Url>;
  delete(id: number): Promise<void>;
}
