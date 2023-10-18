import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ListUrl } from '../../src/use-cases/list-url';
import { UrlRepository } from '../repositories/url-repository';
import { UrlProvider } from '../../src/database/url.providers';

describe('ListUrl', () => {
  let listUrl: ListUrl;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        ConfigService,
        ListUrl,
        { provide: UrlProvider.name, useValue: new UrlRepository() },
      ],
    }).compile();

    listUrl = moduleRef.get(ListUrl);
  });
  it('shold return an array of urls', async () => {
    const urls = await listUrl.execute();

    expect(urls.length).toBe(2);
  });
});
