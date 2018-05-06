import { Module, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandBus, CQRSModule, EventBus } from '@nestjs/cqrs';
import { keywordProvider } from '../keyword/keyword.provider';
import { KeywordController } from './keyword.controller';
import { keywordEventHandlers } from './events/handlers';
import { KeywordService } from './keyword.service';
import { keywordEntryProvider } from './keyword.provider';
import { keywordCommandHandlers } from './commands/handlers';
import { KeywordSagas } from './keyword.sagas';

@Module({
    imports: [CQRSModule],
    controllers: [KeywordController],
    components: [
        keywordProvider,
        keywordEntryProvider,
        ...keywordEventHandlers,
        KeywordService,
        ...keywordCommandHandlers,
        KeywordSagas
    ],
    exports: []
})
export class KeywordModule implements OnModuleInit {
    public constructor(
        private readonly moduleRef: ModuleRef,
        private readonly eventBus: EventBus,
        private readonly commandBus: CommandBus,
        private readonly keywordSagas: KeywordSagas
    ) {}

    public onModuleInit() {
        this.commandBus.setModuleRef(this.moduleRef);
        this.commandBus.register(keywordCommandHandlers);
        this.eventBus.setModuleRef(this.moduleRef);
        // this.eventBus.register(keywordEventHandlers);
        this.eventBus.combineSagas([
            this.keywordSagas.updateKeywordLinks.bind(this.keywordSagas)
        ]);
    }
}
