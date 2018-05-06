import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Sequelize } from 'sequelize-typescript';
import { CreateEntryCommand } from '../impl/createEntry.command';
import { Entry } from '../../entry.entity';
import { EntryModel } from '../../entry.model';

@CommandHandler(CreateEntryCommand)
export class CreateEntryCommandHandler implements ICommandHandler<CreateEntryCommand> {
    constructor(
        @Inject('EntryRepository') private readonly EntryRepository: typeof Entry,
        @Inject('SequelizeInstance') private readonly sequelizeInstance: Sequelize,
        private readonly eventPublisher: EventPublisher
    ) { }

    async execute(command: CreateEntryCommand, resolve: (error?: Error) => void) {
        let caught: Error;

        try {
            const entry = await this.sequelizeInstance.transaction(async transaction => {
                return await this.EntryRepository.create<Entry>({
                    ...command,
                    keywords: JSON.stringify(command.keywords)
                }, {
                    returning: true,
                    transaction
                });
            });

            const entryModel = this.eventPublisher.mergeObjectContext(new EntryModel(entry.id));
            entryModel.updateKeywordLinks(command.keywords);
            entryModel.commit();
        } catch (error) {
            caught = error;
        } finally {
            resolve(caught);
        }
    }
}
