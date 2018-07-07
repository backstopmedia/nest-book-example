import { Comment } from './comment.entity';

export const commentProvider = {
    provide: 'CommentRepository',
    useValue: Comment
};
