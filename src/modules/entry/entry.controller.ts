import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { EntriesService } from './entry.service';
import { CommentsService } from '../comment/comment.service';

import { Entry } from './entry.entity';
import { Comment } from '../comment/comment.entity';

@Controller('entries')
export class EntriesController {
  constructor(
    private readonly entriesSrv: EntriesService,
    private readonly commentsSrv: CommentsService
  ) {}

  @Get()
  findAll() {
    return this.entriesSrv.findAll();
  }

  @Get(':entryId')
  findOneById(@Param('entryId') entryId) {
    return this.entriesSrv.findOneById(entryId);
  }

  @Post()
  async create(@Body() input: { entry: Entry; comments: Comment[] }) {
    const { entry, comments } = input;
    entry.comments = [];
    await comments.forEach(async comment => {
      await this.commentsSrv.create(comment);
      entry.comments.push(comment);
    });
    return this.entriesSrv.create(entry);
  }
}
