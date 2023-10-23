import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { GetUrl } from '../../src/use-cases/get-url';
import { UrlRepository } from '../repositories/url-repository';
import { UrlProvider } from '../../src/database/url.providers';
import { UnprocessableEntityException } from '@nestjs/common';

describe('GetUrl', () => {
  let getUrl: GetUrl;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        ConfigService,
        GetUrl,
        { provide: UrlProvider.name, useValue: new UrlRepository() },
      ],
    }).compile();

    getUrl = moduleRef.get(GetUrl);
  });
  it('should return a URL record', async () => {
    const url = await getUrl.execute('jSt9s8YH');

    expect(url.code).toBe('jSt9s8YH');
  });

  it('Not found url', async () => {
    const shortedUrl = getUrl.execute('notFound');
    await expect(shortedUrl).rejects.toThrowError(
      new UnprocessableEntityException('Url Não encontrada!'),
    );
  });
});
