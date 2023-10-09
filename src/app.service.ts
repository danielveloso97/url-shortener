import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Url } from './entities/url.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}

  async findAll(): Promise<Url[]> {
    return this.urlRepository.find();
  }
}
