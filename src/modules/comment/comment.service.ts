import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>
  ) {}

  findAll() {
    return this.comment.find();
  }

  findOneById(id: string) {
    return this.comment.findOne(id);
  }

  create(comment: Comment) {
    return this.comment.save(comment);
  }
}
