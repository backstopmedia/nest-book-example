import { EntryController } from './entry.controller';
import { entryProvider } from './entry.provider';
import { EntryService } from './entry.service';
import { FetchEntryMiddleware } from '../../shared/middlewares/fetch-entry.middleware';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { Module, NestModule, RequestMethod, OnModuleInit } from '@nestjs/common';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
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

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(FetchEntryMiddleware)
            .forRoutes(EntryController);
    }

    public onModuleInit() {
        this.commandBus.setModuleRef(this.moduleRef);
        this.commandBus.register(entryCommandHandlers);
    }
}
