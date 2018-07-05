import { Injectable, Inject } from '@nestjs/common';
import { IFindOptions } from 'sequelize-typescript';
import { col, fn, Op } from 'sequelize';
import { IKeywordService } from './interfaces/index';
import { Keyword } from './keyword.entity';
import { KeywordEntry } from './keywordEntry.entity';

@Injectable()
export class KeywordService implements IKeywordService {
	constructor(
		@Inject('KeywordRepository')
		private readonly keywordRepository: typeof Keyword,
		@Inject('KeywordEntryRepository')
		private readonly keywordEntryRepository: typeof KeywordEntry
	) {}

	public async findAll(
		search?: string,
		limit?: number
	): Promise<Array<Keyword>> {
		let options: IFindOptions<Keyword> = {};

		if (search) {
			if (!limit || limit < 1 || limit === NaN) {
				limit = 10;
			}

			options = {
				where: {
					keyword: {
						[Op.like]: `%${search}%`
					}
				},
				limit
			};
		}

		return await this.keywordRepository.findAll<Keyword>(options);
	}

	public async findById(id: number): Promise<Keyword | null> {
		return await this.keywordRepository.findById<Keyword>(id);
	}

	public async findHotLinks(): Promise<Array<Keyword>> {
		// Find the latest 5 keyword links
		const latest5 = await this.keywordEntryRepository.findAll<KeywordEntry>(
			{
				attributes: {
					exclude: ['entryId', 'createdAt']
				},
				group: ['keywordId'],
				order: [[fn('max', col('createdAt')), 'DESC']],
				limit: 5
			} as IFindOptions<any>
		);

		// Find the 5 keywords with the most links
		const biggest5 = await this.keywordEntryRepository.findAll<
			KeywordEntry
		>({
			attributes: {
				exclude: ['entryId', 'createdAt']
			},
			group: 'keywordId',
			order: [[fn('count', 'entryId'), 'DESC']],
			limit: 5,
			where: {
				keywordId: {
					// Filter out keywords that already exist in the latest5
					[Op.notIn]: latest5.map(
						keywordEntry => keywordEntry.keywordId
					)
				}
			}
		} as IFindOptions<any>);

		// Load the keyword table data
		const result = await Promise.all(
			[...latest5, ...biggest5].map(keywordEntry =>
				this.findById(keywordEntry.keywordId)
			)
		);

		return result;
	}
}
