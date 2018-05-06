import { Module } from '@nestjs/common';
import { EntriesController } from './entry.controller';
import { EntriesService } from './entry.service';

@Module({
  // imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntriesController],
  components: [EntriesService]
})
export class EntriesModule {}
