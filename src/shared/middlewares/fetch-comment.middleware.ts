import { CommentService } from '../../modules/comment/comment.service';
import {
    Injectable,
    NestMiddleware,
    MiddlewareFunction,
    HttpStatus
} from '@nestjs/common';

@Injectable()
export class FetchCommentMiddleware implements NestMiddleware {
    constructor(private commentService: CommentService) {}

    async resolve(strategy: string): Promise<MiddlewareFunction> {
        return async (req, res, next) => {
            if (!req.params.commentId) return next();

            const comment = await this.commentService.findOne({
                where: {
                    id: req.params.commentId,
                    entryId: req.entry.id
                }
            });
            if (!comment)
                return res
                    .status(HttpStatus.NOT_FOUND)
                    .send('Unable to find the comment.');

            req.comment = comment;
            next();
        };
    }
}
