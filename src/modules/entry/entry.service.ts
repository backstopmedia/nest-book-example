import { Component } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Entry } from './entry.entity';

@Component()
export class EntriesService {
  constructor(
    @InjectRepository(Entry) private readonly entry: Repository<Entry>
  ) {}

  findAll() {
    return this.entry.find();
  }

  findOneById(id: number) {
    return this.entry.findOne(id, { relations: ['comments'] });
  }

  create(newEntry: Entry) {
    this.entry.save(newEntry);
  }
}
