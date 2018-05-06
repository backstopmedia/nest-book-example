import { ICommand } from '@nestjs/cqrs';
import { IEntry } from '../../interfaces';

export class UpdateEntryCommand implements ICommand, IEntry {
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly content: string,
        public readonly keywords: string[],
        public readonly userId: number
    ) {}
}
