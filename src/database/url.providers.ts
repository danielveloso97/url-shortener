import { DataSource, Repository } from 'typeorm';
import { Url } from '../entities/url.entity';
import { UrlRepository } from '../repositories/url.repository';
import { CreateShortUrlDto } from '../dtos/create-short-url-dto';
import { Inject, Injectable } from '@nestjs/common';

export const UrlProviders = [
  {
    provide: 'URL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Url),
    inject: ['DATA_SOURCE'],
  },
];

@Injectable()
export class UrlProvider implements UrlRepository {
  private repository: Repository<Url>;
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(Url);
  }

  async create(data: CreateShortUrlDto): Promise<Url> {
    const url = this.repository.create(data);
    await this.repository.save(url);
    return url;
  }

  find(): Promise<Url[]> {
    return this.repository.find();
  }

  async findOne(code: string): Promise<Url> {
    const url = await this.repository.findOne({ where: { code } });
    return url;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
