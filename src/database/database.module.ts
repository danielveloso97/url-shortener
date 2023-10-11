import { Module } from '@nestjs/common';
import { databaseProviders as DataP } from './database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...DataP],
  exports: [...DataP],
})
export class DataBaseModule {}
