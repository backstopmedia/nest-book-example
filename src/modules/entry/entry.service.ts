import { Injectable, Inject } from '@nestjs/common';
import { IEntry, IEntryService } from './interfaces/index';
import { Entry } from './entry.entity';

@Injectable()
export class EntryService implements IEntryService {
	constructor(
		@Inject('EntryRepository')
		private readonly EntryRepository: typeof Entry,
		@Inject('SequelizeInstance') private readonly sequelizeInstance
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
}
