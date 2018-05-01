import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntriesModule } from './modules/entry/entry.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:27017/nest'), EntriesModule]
})
export class AppModule {}
