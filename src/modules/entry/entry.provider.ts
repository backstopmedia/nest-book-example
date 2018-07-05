import { Entry } from './entry.entity';

export const entryProvider = {
	provide: 'EntryRepository',
	useValue: Entry
};
