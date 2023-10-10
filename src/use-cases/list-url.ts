import { Inject, Injectable } from '@nestjs/common';
import { Url } from 'src/entities/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListUrl {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}
  async findAll(): Promise<Url[]> {
    return this.urlRepository.find();
  }
}
