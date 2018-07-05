import { CommentController } from './comment.controller';
import { commentProvider } from './comment.provider';
import { CommentService } from './comment.service';
import { EntryModule } from '../entry/entry.module';
import { FetchCommentMiddleware } from '../../shared/middlewares/fetch-comment.middleware';
import { FetchEntryMiddleware } from '../../shared/middlewares/fetch-entry.middleware';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { Module, NestModule, RequestMethod } from '@nestjs/common';

@Module({
	imports: [EntryModule],
	controllers: [CommentController],
	providers: [commentProvider, CommentService],
	exports: [CommentService]
})
export class CommentModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(FetchEntryMiddleware)
			.forRoutes(CommentController)
			.apply(FetchCommentMiddleware)
			.forRoutes(
				{
					path: 'entries/:entryId/comments/:commentId',
					method: RequestMethod.GET
				},
				{
					path: 'entries/:entryId/comments/:commentId',
					method: RequestMethod.PUT
				},
				{
					path: 'entries/:entryId/comments/:commentId',
					method: RequestMethod.DELETE
				}
			);
	}
}
