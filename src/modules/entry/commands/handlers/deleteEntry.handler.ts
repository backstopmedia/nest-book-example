import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Sequelize } from 'sequelize-typescript';
import { DeleteEntryCommand } from '../impl/deleteEntry.command';
import { Entry } from '../../entry.entity';

@CommandHandler(DeleteEntryCommand)
export class DeleteEntryCommandHandler implements ICommandHandler<DeleteEntryCommand> {
    constructor(
        @Inject('EntryRepository') private readonly EntryRepository: typeof Entry,
        @Inject('SequelizeInstance') private readonly sequelizeInstance: Sequelize
    ) { }

    async execute(command: DeleteEntryCommand, resolve: (error?: Error) => void) {
        let caught: Error;

        try {
            await this.sequelizeInstance.transaction(async transaction => {
                return await this.EntryRepository.destroy({
                    where: { id: command.id },
                    transaction,
                });
            });
        } catch (error) {
            caught = error;
        } finally {
            resolve(caught);
        }
    }
}
