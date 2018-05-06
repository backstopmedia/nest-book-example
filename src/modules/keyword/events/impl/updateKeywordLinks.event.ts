import { IEvent } from '@nestjs/cqrs';

export class UpdateKeywordLinksEvent implements IEvent {
    constructor(
        public readonly entryId: number,
        public readonly keywords: string[]
    ) { }
}
