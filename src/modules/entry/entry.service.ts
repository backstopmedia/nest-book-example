import { Component, Inject } from '@nestjs/common';
import { IEntry, IEntryService } from './interfaces/index';
import { Entry } from './entry.entity';

@Component()
export class EntryService implements IEntryService {
    constructor(@Inject('EntryRepository') private readonly EntryRepository: typeof Entry,
                @Inject('SequelizeInstance') private readonly sequelizeInstance) { }

    public async findAll(options?: object): Promise<Array<Entry>> {
        return await this.EntryRepository.findAll<Entry>(options);
    }

    public async findOne(options?: object): Promise<Entry | null> {
        return await this.EntryRepository.findOne<Entry>(options);
    }

    public async findById(id: number): Promise<Entry | null> {
        return await this.EntryRepository.findById<Entry>(id);
    }

    public async create(entry: IEntry): Promise<Entry> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.EntryRepository.create<Entry>(entry, {
                returning: true,
                transaction,
            });
        });
    }

    public async update(id: number, newValue: IEntry): Promise<Entry | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let entry = await this.EntryRepository.findById<Entry>(id, { transaction });
            if (!entry) throw new Error('The entry was not found.');

            entry = this._assign(entry, newValue);
            return await entry.save({
                returning: true,
                transaction,
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.EntryRepository.destroy({
                where: { id },
                transaction,
            });
        });
    }

    /**
     * @description: Assign new value in the entry found in the database.
     *
     * @param {IEntry} entry
     * @param {IEntry} newValue
     * @return {Entry}
     * @private
     */
    private _assign(entry: Entry, newValue: IEntry): Entry {
        for (const key of Object.keys(entry.dataValues)) {
            if (!newValue[key]) continue;
            if (entry[key] !== newValue[key]) entry[key] = newValue[key];
        }

        return entry as Entry;
    }
}
