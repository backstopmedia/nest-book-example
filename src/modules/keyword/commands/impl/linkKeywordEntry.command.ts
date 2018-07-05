import { ICommand } from '@nestjs/cqrs';

export class LinkKeywordEntryCommand implements ICommand {
	constructor(
		public readonly keyword: string,
		public readonly entryId: number
	) {}
}
