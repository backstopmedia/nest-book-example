

import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Sequelize } from 'sequelize-typescript';
import { LinkKeywordEntryCommand } from '../impl/linkKeywordEntry.command';
import { Keyword } from '../../keyword.entity';

@CommandHandler(LinkKeywordEntryCommand)
export class LinkKeywordEntryCommandHandler implements ICommandHandler<LinkKeywordEntryCommand> {
    constructor(
        @Inject('KeywordRepository') private readonly keywordRepository: typeof Keyword,
        @Inject('SequelizeInstance') private readonly sequelizeInstance: Sequelize
    ) { }

    async execute(command: LinkKeywordEntryCommand, resolve: (error?: Error) => void) {
        let caught: Error;

        try {
            await this.sequelizeInstance.transaction(async transaction => {
                const keyword = await this.keywordRepository.findOrCreate({
                    where: {
                        keyword: command.keyword
                    },
                    transaction
                });

                await keyword[0].$add('entries', command.entryId, { transaction });
            });
        } catch (error) {
            caught = error;
        } finally {
            resolve(caught);
        }
    }
}
