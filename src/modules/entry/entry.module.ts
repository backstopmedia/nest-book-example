import { EntryController } from './entry.controller';
import { entryProvider } from './entry.provider';
import { EntryService } from './entry.service';
import { FetchEntryMiddleware } from '../../shared/middlewares/fetch-entry.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import {
    Module,
    NestModule,
    OnModuleInit,
    RequestMethod
} from '@nestjs/common';
import { CommandBus, CQRSModule } from '@nestjs/cqrs';
import { entryCommandHandlers } from './commands/handlers/index';
import { ModuleRef } from '@nestjs/core';

@Module({
    imports: [CQRSModule],
    controllers: [EntryController],
    providers: [entryProvider, EntryService, ...entryCommandHandlers],
    exports: [EntryService]
})
export class EntryModule implements NestModule, OnModuleInit {
    public constructor(
        private readonly moduleRef: ModuleRef,
        private readonly commandBus: CommandBus
    ) {}

    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(FetchEntryMiddleware)
            .forRoutes(
                { path: 'entries/:entryId', method: RequestMethod.GET },
                { path: 'entries/:entryId', method: RequestMethod.PUT },
                { path: 'entries/:entryId', method: RequestMethod.DELETE }
            );
    }

    public onModuleInit() {
        this.commandBus.setModuleRef(this.moduleRef);
        this.commandBus.register(entryCommandHandlers);
    }
}
