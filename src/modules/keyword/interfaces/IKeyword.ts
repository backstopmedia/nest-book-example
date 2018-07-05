import { Entry } from '../../entry/entry.entity';

export interface IKeyword {
    id?: number;
    keyword: string;
    entries?: Array<Entry>;
}
