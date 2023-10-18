import { Inject, Injectable } from '@nestjs/common';
import { UrlProvider } from '../database/url.providers';
import { Url } from '../entities/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListUrl {
  constructor(
    @Inject(UrlProvider.name)
    private urlRepository: Repository<Url>,
  ) {}
  async execute(): Promise<Url[]> {
    return this.urlRepository.find();
  }
}
