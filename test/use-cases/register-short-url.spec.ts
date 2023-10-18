import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisterShortUrl } from '../../src/use-cases/register-short-url';
import { UrlRepository } from '../repositories/url-repository';
import { Test } from '@nestjs/testing';
import { UnprocessableEntityException } from '@nestjs/common';
import { UrlProvider } from '../../src/database/url.providers';

describe('RegisterShortUrl', () => {
  let registerShortUrl: RegisterShortUrl;
  let urlRepository: any;

  beforeEach(async () => {
    urlRepository = new UrlRepository();
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        ConfigService,
        RegisterShortUrl,
        { provide: UrlProvider.name, useValue: urlRepository },
      ],
    }).compile();

    registerShortUrl = moduleRef.get(RegisterShortUrl);
  });

  it('should by one short url', async () => {
    const shortedUrl = await registerShortUrl.execute(
      'https://shorted.url.com',
      'This is URL',
    );
    expect(shortedUrl).toHaveProperty('id');
    expect(shortedUrl.title).toBe('This is URL');
  });

  it(' Invalid url', async () => {
    const shortedUrl = registerShortUrl.execute('shorted', 'this is url');
    await expect(shortedUrl).rejects.toThrowError(
      new UnprocessableEntityException('A Url Não é Válida'),
    );
  });
});
