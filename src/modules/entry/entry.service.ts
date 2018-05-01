import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { EntrySchema } from './entry.schema';
import { Entry } from './entry.interface';

@Component()
export class EntriesService {
  constructor(
    @InjectModel(EntrySchema) private readonly entryModel: Model<Entry>
  ) {}

  // this method retrieves all entries
  findAll() {
    return this.entryModel.find().exec();
  }

  // this method retrieves only one entry, by entry ID
  findById(id: string) {
    return this.entryModel.findById(id).exec();
  }

  // this method saves an entry in the database
  create(entry) {
    entry._id = new Types.ObjectId();
    const createdEntry = new this.entryModel(entry);
    return createdEntry.save();
  }
}
