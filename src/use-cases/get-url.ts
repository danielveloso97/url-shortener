import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Url } from '../entities/url.entity';

@Injectable()
export class GetUrl {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}
  async execute(code: string): Promise<Url> {
    return this.urlRepository.findOne({ where: { code } });
  }
}
