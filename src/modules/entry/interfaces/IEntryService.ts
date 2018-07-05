import { Entry } from '../entry.entity';
import { IEntry } from '../interfaces/index';

export interface IEntryService {
	findAll(): Promise<Array<Entry>>;
	findById(id: number): Promise<Entry | null>;
	findOne(options: object): Promise<Entry | null>;
}
