import { Inject, Injectable } from '@nestjs/common';
import { IEntry, IEntryService } from './interfaces/index';
import { Entry } from './entry.entity';
import { DatabaseUtilitiesService } from '../database/database-utilities.service';

@Injectable()
export class EntryService implements IEntryService {
    constructor(
        @Inject('EntryRepository')
        private readonly EntryRepository: typeof Entry,
        @Inject('SequelizeInstance') private readonly sequelizeInstance,
        private readonly databaseUtilitiesService: DatabaseUtilitiesService
    ) {}

    public async findAll(options?: object): Promise<Array<Entry>> {
        return await this.EntryRepository.findAll<Entry>(options);
    }

    public async findOne(options?: object): Promise<Entry | null> {
        return await this.EntryRepository.findOne<Entry>(options);
    }

    public async findById(id: number): Promise<Entry | null> {
        return await this.EntryRepository.findById<Entry>(id);
    }

    public async create(Entry: IEntry): Promise<Entry> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.EntryRepository.create<Entry>(Entry, {
                returning: true,
                transaction
            });
        });
    }

    public async update(id: number, newValue: IEntry): Promise<Entry | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let Entry = await this.EntryRepository.findById<Entry>(id, {
                transaction
            });
            if (!Entry) throw new Error('The Entry was not found.');

            Entry = this.databaseUtilitiesService.assign(Entry, newValue);
            return await Entry.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.EntryRepository.destroy({
                where: { id },
                transaction
            });
        });
    }
}
