import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Url } from '../entities/url.entity';

@Injectable()
export class GetUrl {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}
  async execute(code: string): Promise<Url> {
    const url = await this.urlRepository.findOne({ where: { code } });
    if (!url) {
      throw new NotFoundException('Url Não encontrada!');
    }
    return url;
  }
}
