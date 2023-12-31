import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UrlProvider } from './database/url.providers';
import { ListUrl } from './use-cases/list-url';
import { AppController } from './app.controller';
import { GetUrl } from './use-cases/get-url';
import { RegisterShortUrl } from './use-cases/register-short-url';
import { DeleteUrl } from './use-cases/delete-url';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DataBaseModule],
  providers: [
    ListUrl,
    GetUrl,
    RegisterShortUrl,
    DeleteUrl,
    { provide: UrlProvider.name, useClass: UrlProvider },
  ],
  controllers: [AppController],
})
export class AppModule {}
