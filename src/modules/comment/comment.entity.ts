import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne
} from 'typeorm';

import { Entry } from '../entry/entry.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('text') body: string;

  @Column('simple-json') author: { first_name: string; last_name: string };

  @ManyToOne(type => Entry, entry => entry.comments)
  entry: Entry;

  @CreateDateColumn() created_at: Date;

  @UpdateDateColumn() modified_at: Date;

  @VersionColumn() revision: number;
}
