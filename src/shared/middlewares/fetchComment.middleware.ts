import { CommentService } from '../../modules/comment/comment.service';
import { Middleware, NestMiddleware, ExpressMiddleware, HttpStatus } from '@nestjs/common';

@Middleware()
export class FetchCommentMiddleware implements NestMiddleware {
    constructor(private commentService: CommentService) { }

    async resolve(strategy: string): Promise<ExpressMiddleware> {
        return async (req, res, next) => {
            if (!req.params.commentId) return res.status(HttpStatus.BAD_REQUEST).send('Missing commentId.');

            const comment = await this.commentService.findOne({
                where: {
                    id: req.params.commentId,
                    entryId: req.entry.id
                }
            });
            if (!comment) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the comment.');

            req.comment = comment;
            next();
        };
    }
}
