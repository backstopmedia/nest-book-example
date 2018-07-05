import { Keyword } from './keyword.entity';
import { KeywordEntry } from './keywordEntry.entity';

export const keywordProvider = {
	provide: 'KeywordRepository',
	useValue: Keyword
};

export const keywordEntryProvider = {
	provide: 'KeywordEntryRepository',
	useValue: KeywordEntry
};
