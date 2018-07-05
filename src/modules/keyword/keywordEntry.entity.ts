import {
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { Entry } from '../entry/entry.entity';
import { Keyword } from './keyword.entity';

const tableOptions: IDefineOptions = {
	timestamp: true,
	tableName: 'keywords_entries',
	deletedAt: false,
	updatedAt: false
} as IDefineOptions;

@Table(tableOptions)
export class KeywordEntry extends Model<KeywordEntry> {
	@ForeignKey(() => Keyword)
	@Column({
		type: DataType.BIGINT,
		allowNull: false
	})
	public keywordId: number;

	@ForeignKey(() => Entry)
	@Column({
		type: DataType.BIGINT,
		allowNull: false
	})
	public entryId: number;

	@CreatedAt public createdAt: Date;
}
