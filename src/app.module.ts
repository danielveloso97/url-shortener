import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UrlProviders } from './database/url.providers';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [DataBaseModule],
  providers: [...UrlProviders, AppService],
  controllers: [AppController],
})
export class AppModule {}
