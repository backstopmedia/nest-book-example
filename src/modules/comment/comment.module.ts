import { CommentController } from './comment.controller';
import { commentProvider } from './comment.provider';
import { CommentService } from './comment.service';
import { EntryModule } from '../entry/entry.module';
import { FetchCommentMiddleware } from '../../shared/middlewares/fetch-comment.middleware';
import { FetchEntryMiddleware } from '../../shared/middlewares/fetch-entry.middleware';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { Module, NestModule } from '@nestjs/common';

@Module({
    imports: [EntryModule],
    controllers: [CommentController],
    providers: [commentProvider, CommentService],
    exports: [CommentService]
})
export class CommentModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(FetchEntryMiddleware)
            .forRoutes(CommentController)
            .apply(FetchCommentMiddleware)
            .forRoutes(CommentController)
    }
}
