import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DeleteUrl } from '../../src/use-cases/delete-url';
import { UrlProvider } from '../../src/database/url.providers';
import { UnprocessableEntityException } from '@nestjs/common';
import { UrlRepository } from '../repositories/url-repository';

describe('GetUrl', () => {
  let deleteUrl: DeleteUrl;
  let urlRepository: UrlRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        ConfigService,
        DeleteUrl,
        { provide: UrlProvider.name, useValue: new UrlRepository() },
      ],
    }).compile();

    deleteUrl = moduleRef.get(DeleteUrl);
    urlRepository = moduleRef.get(UrlProvider.name);
  });
  it('Delete a URL record', async () => {
    const numberUrlsBeforeDelete = (await urlRepository.find()).length;
    await deleteUrl.execute('jSt9s8YH');
    const numberUrlsAfterDelete = (await urlRepository.find()).length;
    expect(numberUrlsAfterDelete).toBe(numberUrlsBeforeDelete - 1);
  });
  it('Not found url', async () => {
    const shortedUrl = deleteUrl.execute('notFound');
    await expect(shortedUrl).rejects.toThrowError(
      new UnprocessableEntityException('Url Não encontrada!'),
    );
  });
});
