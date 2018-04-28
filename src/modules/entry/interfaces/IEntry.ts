import { Comment } from '../../comment/comment.entity';

export interface IEntry {
    id?: number;
    title: string;
    content: string;
    userId: number;
    comments?: Array<Comment>
}
