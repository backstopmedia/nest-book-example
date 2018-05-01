import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './comment.entity';
import { CommentsService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  components: [CommentsService]
})
export class EntriesModule {}
