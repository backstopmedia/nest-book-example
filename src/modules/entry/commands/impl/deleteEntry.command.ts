import { ICommand } from '@nestjs/cqrs';
import { IEntry } from '../../interfaces';

export class DeleteEntryCommand implements ICommand {
	constructor(public readonly id: number) {}
}
