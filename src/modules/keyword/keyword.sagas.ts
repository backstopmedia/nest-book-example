import { Injectable, Inject } from '@nestjs/common';
import { EventObservable } from '@nestjs/cqrs';
import { Sequelize } from 'sequelize-typescript';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import { mergeMap, switchMap } from 'rxjs/operators';
import { UpdateKeywordLinksEvent } from './events/impl/updateKeywordLinks.event';
import { Keyword } from './keyword.entity';
import { Entry } from '../entry/entry.entity';
import { UnlinkKeywordEntryCommand } from './commands/impl/unlinkKeywordEntry.command';
import { LinkKeywordEntryCommand } from './commands/impl/linkKeywordEntry.command';

@Injectable()
export class KeywordSagas {
    constructor(
        @Inject('KeywordRepository') private readonly keywordRepository: typeof Keyword,
        @Inject('SequelizeInstance') private readonly sequelizeInstance: Sequelize,
    ) { }

    public updateKeywordLinks(events$: EventObservable<any>) {
        return events$.ofType(UpdateKeywordLinksEvent).pipe(
            mergeMap(event => this.compileKeywordLinkCommands(event))
        );
    }

    private compileKeywordLinkCommands(event: UpdateKeywordLinksEvent) {
        return Observable.fromPromise(this.keywordRepository.findAll({
            include: [{ model: Entry, where: { id: event.entryId }}]
        })).pipe(
            switchMap(keywordEntities =>
                Observable.of(
                    ...this.getUnlinkCommands(event, keywordEntities),
                    ...this.getLinkCommands(event, keywordEntities)
                )
            )
        );
    }

    private getUnlinkCommands(event: UpdateKeywordLinksEvent, keywordEntities: Keyword[]) {
        return keywordEntities
            .filter(keywordEntity => event.keywords.indexOf(keywordEntity.keyword) === -1)
            .map(keywordEntity => new UnlinkKeywordEntryCommand(keywordEntity.keyword, event.entryId));
    }

    private getLinkCommands(event: UpdateKeywordLinksEvent, keywordEntities: Keyword[]) {
        return event.keywords
            .filter(keyword => keywordEntities.findIndex(keywordEntity => keywordEntity.keyword === keyword) === -1)
            .map(keyword => new LinkKeywordEntryCommand(keyword, event.entryId));
    }
}