import { Comment } from '../comment.entity';
import { IComment } from '../interfaces/index';

export interface ICommentService {
	findAll(): Promise<Array<Comment>>;
	findById(id: number): Promise<Comment | null>;
	findOne(options: object): Promise<Comment | null>;
	create(comment: IComment): Promise<Comment>;
	update(id: number, newValue: IComment): Promise<Comment | null>;
	delete(id: number): Promise<void>;
}
