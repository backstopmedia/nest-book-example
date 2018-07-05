import { AggregateRoot } from '@nestjs/cqrs';
import { UpdateKeywordLinksEvent } from '../keyword/events/impl/updateKeywordLinks.event';

export class EntryModel extends AggregateRoot {
	constructor(private readonly id: number) {
		super();
	}

	updateKeywordLinks(keywords: string[]) {
		this.apply(new UpdateKeywordLinksEvent(this.id, keywords));
	}
}
