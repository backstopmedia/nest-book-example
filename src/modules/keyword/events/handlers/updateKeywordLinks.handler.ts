import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { UpdateKeywordLinksEvent } from '../impl/updateKeywordLinks.event';
import { Keyword } from '../../keyword.entity';
import { Entry } from '../../../entry/entry.entity';

@EventsHandler(UpdateKeywordLinksEvent)
export class UpdateKeywordLinksEventHandler
    implements IEventHandler<UpdateKeywordLinksEvent> {
    constructor(
        @Inject('KeywordRepository')
        private readonly keywordRepository: typeof Keyword,
        @Inject('SequelizeInstance')
        private readonly sequelizeInstance: Sequelize
    ) {}

    async handle(event: UpdateKeywordLinksEvent) {
        try {
            await this.sequelizeInstance.transaction(async transaction => {
                let newKeywords: string[] = [];
                let removedKeywords: Keyword[] = [];

                const keywordEntities = await this.keywordRepository.findAll({
                    include: [{ model: Entry, where: { id: event.entryId } }],
                    transaction
                });

                keywordEntities.forEach(keywordEntity => {
                    if (event.keywords.indexOf(keywordEntity.keyword) === -1) {
                        removedKeywords.push(keywordEntity);
                    }
                });

                event.keywords.forEach(keyword => {
                    if (
                        keywordEntities.findIndex(
                            keywordEntity => keywordEntity.keyword === keyword
                        ) === -1
                    ) {
                        newKeywords.push(keyword);
                    }
                });

                await Promise.all(
                    newKeywords.map(keyword =>
                        this.ensureKeywordLinkExists(
                            transaction,
                            keyword,
                            event.entryId
                        )
                    )
                );
                await Promise.all(
                    removedKeywords.map(keyword =>
                        keyword.$remove('entries', event.entryId, {
                            transaction
                        })
                    )
                );
            });
        } catch (error) {
            console.log(error);
        }
    }

    async ensureKeywordLinkExists(
        transaction: Transaction,
        keyword: string,
        entryId: number
    ) {
        const keywordEntity = await this.ensureKeywordExists(
            transaction,
            keyword
        );
        await keywordEntity.$add('entries', entryId, { transaction });
    }

    async ensureKeywordExists(
        transaction: Transaction,
        keyword: string
    ): Promise<Keyword> {
        const result = await this.keywordRepository.findOrCreate<Keyword>({
            where: { keyword },
            transaction
        });
        return result[0];
    }
}
