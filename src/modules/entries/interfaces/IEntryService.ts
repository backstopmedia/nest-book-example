import { Entry } from '../entry.entity';
import { IEntry } from '../interfaces/index';

export interface IEntryService {
    findAll(): Promise<Array<Entry>>;
    findById(id: number): Promise<Entry | null>;
    findOne(options: object): Promise<Entry | null>;
    create(entry: IEntry): Promise<Entry>;
    update(id: number, newValue: IEntry): Promise<Entry | null>;
    delete(id: number): Promise<void>;
}
