import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Entry } from './entry.entity';
import { EntriesController } from './entry.controller';
import { EntriesService } from './entry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntriesController],
  components: [EntriesService]
})
export class EntriesModule {}
