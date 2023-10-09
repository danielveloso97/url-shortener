import { DataSource } from 'typeorm';
import { Url } from '../entities/url.entity';

export const UrlProviders = [
  {
    provide: 'URL_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Url),
    inject: ['DATA_SOURCE'],
  },
];
