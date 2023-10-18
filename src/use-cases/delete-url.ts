import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UrlProvider } from '../database/url.providers';
import { UrlRepository } from '../repositories/url.repository';

@Injectable()
export class DeleteUrl {
  constructor(
    @Inject(UrlProvider.name)
    private urlRepository: UrlRepository,
  ) {}
  async execute(code: string): Promise<void> {
    const url = await this.urlRepository.findOne(code);
    if (!url) {
      throw new NotFoundException('Url Não encontrada!');
    }
    await this.urlRepository.delete(url.id);
  }
}
