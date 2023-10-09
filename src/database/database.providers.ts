import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'url_shortener',
        entities: [__dirname + '/../entities/*.entity.js'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
