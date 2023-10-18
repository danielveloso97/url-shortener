import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Url } from '../entities/url.entity';
import { UrlProvider } from '../database/url.providers';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class GetUrl {
  constructor(
    @Inject(UrlProvider.name)
    private urlRepository: UrlRepository,
  ) {}
  async execute(code: string): Promise<Url> {
    const url = await this.urlRepository.findOne(code);
    if (!url) {
      throw new NotFoundException('Url Não encontrada!');
    }
    return url;
  }
}
