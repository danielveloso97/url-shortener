import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UrlProviders } from './database/url.providers';
import { ListUrl } from './use-cases/list-url';
import { AppController } from './app.controller';
import { GetUrl } from './use-cases/get-url';
import { RegisterShortUrl } from './use-cases/register-short-url';

@Module({
  imports: [DataBaseModule],
  providers: [...UrlProviders, ListUrl, GetUrl, RegisterShortUrl],
  controllers: [AppController],
})
export class AppModule {}
