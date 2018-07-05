import { ICommand } from '@nestjs/cqrs';
import { IEntry } from '../../interfaces';

export class CreateEntryCommand implements ICommand, IEntry {
    constructor(
        public readonly title: string,
        public readonly content: string,
        public readonly keywords: string[],
        public readonly userId: number
    ) {}
}
