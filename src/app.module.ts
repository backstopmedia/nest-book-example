import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesModule } from './modules/entry/entry.module';

@Module({
  imports: [TypeOrmModule.forRoot(), EntriesModule]
})
export class AppModule {}
