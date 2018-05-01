import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EntrySchema } from './entry.schema';
import { EntriesController } from './entry.controller';
import { EntriesService } from './entry.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Entry', schema: EntrySchema }])
  ],
  controllers: [EntriesController],
  components: [EntriesService]
})
export class EntriesModule {}
