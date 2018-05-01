import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';

import { Comment } from '../comment/comment.entity';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column() title: string;

  @Column('text') body: string;

  @Column() image: string;

  @Column('simple-json') author: { first_name: string; last_name: string };

  @OneToMany(type => Comment, comment => comment.id, {
    cascade: true
  })
  comments: Comment[];
}
