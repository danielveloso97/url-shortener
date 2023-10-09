import { Module } from '@nestjs/common';
import { databaseProviders as DataP } from './database.providers';

@Module({
  providers: [...DataP],
  exports: [...DataP],
})
export class DataBaseModule {}
