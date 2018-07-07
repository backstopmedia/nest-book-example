import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Sequelize } from 'sequelize-typescript';
import { UnlinkKeywordEntryCommand } from '../impl/unlinkKeywordEntry.command';
import { Keyword } from '../../keyword.entity';

@CommandHandler(UnlinkKeywordEntryCommand)
export class UnlinkKeywordEntryCommandHandler
    implements ICommandHandler<UnlinkKeywordEntryCommand> {
    constructor(
        @Inject('KeywordRepository')
        private readonly keywordRepository: typeof Keyword,
        @Inject('SequelizeInstance')
        private readonly sequelizeInstance: Sequelize
    ) {}

    async execute(
        command: UnlinkKeywordEntryCommand,
        resolve: (error?: Error) => void
    ) {
        let caught: Error;

        try {
            await this.sequelizeInstance.transaction(async transaction => {
                const keyword = await this.keywordRepository.findOrCreate<
                    Keyword
                >({
                    where: {
                        keyword: command.keyword
                    },
                    transaction
                });

                await keyword[0].$remove('entries', command.entryId, {
                    transaction
                });
            });
        } catch (error) {
            caught = error;
        } finally {
            resolve(caught);
        }
    }
}
