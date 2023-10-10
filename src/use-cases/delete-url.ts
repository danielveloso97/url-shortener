import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Url } from 'src/entities/url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteUrl {
  constructor(
    @Inject('URL_REPOSITORY')
    private urlRepository: Repository<Url>,
  ) {}
  async execute(code: string): Promise<void> {
    const url = await this.urlRepository.findOne({ where: { code } });
    if (!url) {
      throw new NotFoundException('Url Não encontrada!');
    }
    await this.urlRepository.delete(url.id);
  }
}
