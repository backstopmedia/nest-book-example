import { EntryController } from './entry.controller';
import { entryProvider } from './entry.provider';
import { EntryService } from './entry.service';
import { FetchEntryMiddleware } from '../../shared/middlewares/fetchEntry.middleware';
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
                { path: 'users/:userId/entries/:entryId', method: RequestMethod.GET },
                { path: 'users/:userId/entries/:entryId', method: RequestMethod.PUT },
                { path: 'users/:userId/entries/:entryId', method: RequestMethod.DELETE });
    }
}
