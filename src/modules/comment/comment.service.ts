import { Injectable, Inject } from '@nestjs/common';
import { IComment, ICommentService } from './interfaces/index';
import { Comment } from './comment.entity';
import { DatabaseUtilitiesService } from '../database/database-utilities.service';

@Injectable()
export class CommentService implements ICommentService {
	constructor(
		@Inject('CommentRepository')
		private readonly CommentRepository: typeof Comment,
		@Inject('SequelizeInstance') private readonly sequelizeInstance,
		private readonly databaseUtilitiesService: DatabaseUtilitiesService
	) {}

	public async findAll(options?: object): Promise<Array<Comment>> {
		return await this.CommentRepository.findAll<Comment>(options);
	}

	public async findOne(options?: object): Promise<Comment | null> {
		return await this.CommentRepository.findOne<Comment>(options);
	}

	public async findById(id: number): Promise<Comment | null> {
		return await this.CommentRepository.findById<Comment>(id);
	}

	public async create(comment: IComment): Promise<Comment> {
		return await this.sequelizeInstance.transaction(async transaction => {
			return await this.CommentRepository.create<Comment>(comment, {
				returning: true,
				transaction
			});
		});
	}

	public async update(
		id: number,
		newValue: IComment
	): Promise<Comment | null> {
		return await this.sequelizeInstance.transaction(async transaction => {
			let comment = await this.CommentRepository.findById<Comment>(id, {
				transaction
			});
			if (!comment) throw new Error('The comment was not found.');

			comment = this.databaseUtilitiesService.assign(comment, newValue);
			return await comment.save({
				returning: true,
				transaction
			});
		});
	}

	public async delete(id: number): Promise<void> {
		return await this.sequelizeInstance.transaction(async transaction => {
			return await this.CommentRepository.destroy({
				where: { id },
				transaction
			});
		});
	}
}
