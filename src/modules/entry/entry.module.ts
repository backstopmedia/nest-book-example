import { EntryController } from './entry.controller';
import { entryProvider } from './entry.provider';
import { EntryService } from './entry.service';
import { FetchEntryMiddleware } from '../../shared/middlewares/fetch-entry.middleware';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { Module, NestModule, RequestMethod } from '@nestjs/common';

@Module({
    controllers: [EntryController],
    components: [entryProvider, EntryService],
    exports: [EntryService]
})
export class EntryModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(FetchEntryMiddleware)
            .forRoutes(
                { path: 'entries/:entryId', method: RequestMethod.GET },
                { path: 'entries/:entryId', method: RequestMethod.PUT },
                { path: 'entries/:entryId', method: RequestMethod.DELETE });
    }
}
