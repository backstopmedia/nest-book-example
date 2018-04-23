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

    public async create(user: IEntry): Promise<Entry> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.EntryRepository.create<Entry>(user, {
                returning: true,
                transaction,
            });
        });
    }

    public async update(id: number, newValue: IEntry): Promise<Entry | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let user = await this.EntryRepository.findById<Entry>(id, { transaction });
            if (!user) throw new Error('The user was not found.');

            user = this._assign(user, newValue);
            return await user.save({
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
     * @description: Assign new value in the user found in the database.
     *
     * @param {IEntry} user
     * @param {IEntry} newValue
     * @return {Entry}
     * @private
     */
    private _assign(user: Entry, newValue: IEntry): Entry {
        for (const key of Object.keys(user.dataValues)) {
            if (!newValue[key]) continue;
            if (user[key] !== newValue[key]) user[key] = newValue[key];
        }

        return user as Entry;
    }
}
