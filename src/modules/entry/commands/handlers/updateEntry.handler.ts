import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Sequelize } from 'sequelize-typescript';
import { UpdateEntryCommand } from '../impl/updateEntry.command';
import { Entry } from '../../entry.entity';
import { DatabaseUtilitiesService } from '../../../database/database-utilities.service';
import { EntryModel } from '../../entry.model';

@CommandHandler(UpdateEntryCommand)
export class UpdateEntryCommandHandler implements ICommandHandler<UpdateEntryCommand> {
    constructor(
        @Inject('EntryRepository') private readonly EntryRepository: typeof Entry,
        @Inject('SequelizeInstance') private readonly sequelizeInstance: Sequelize,
        private readonly databaseUtilitiesService: DatabaseUtilitiesService,
        private readonly eventPublisher: EventPublisher
    ) { }

    async execute(command: UpdateEntryCommand, resolve: (error?: Error) => void) {
        let caught: Error;

        try {
            await this.sequelizeInstance.transaction(async transaction => {
                let entry = await this.EntryRepository.findById<Entry>(command.id, { transaction });
                if (!entry) throw new Error('The comment was not found.');

                entry = this.databaseUtilitiesService.assign(
                    entry,
                    {
                        ...command,
                        id: undefined,
                        keywords: JSON.stringify(command.keywords)
                    }
                );
                return await entry.save({
                    returning: true,
                    transaction,
                });
            });

            const entryModel = this.eventPublisher.mergeObjectContext(new EntryModel(command.id));
            entryModel.updateKeywordLinks(command.keywords);
            entryModel.commit();
        } catch (error) {
            caught = error;
        } finally {
            resolve(caught);
        }
    }
}
