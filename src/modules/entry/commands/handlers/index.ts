import { CreateEntryCommandHandler } from './createEntry.handler';
import { UpdateEntryCommandHandler } from './updateEntry.handler';
import { DeleteEntryCommandHandler } from './deleteEntry.handler';

export const entryCommandHandlers = [
	CreateEntryCommandHandler,
	UpdateEntryCommandHandler,
	DeleteEntryCommandHandler
];
