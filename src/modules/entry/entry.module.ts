import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntriesController } from './entry.controller';
import { EntrySchema } from './entry.schema';
import { EntriesService } from './entry.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }])
  ],
  controllers: [EntriesController],
  providers: [EntriesService]
})
export class EntriesModule {}
