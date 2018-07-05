import * as crypto from 'crypto';
import {
	AutoIncrement,
	BeforeCreate,
	BeforeValidate,
	Column,
	CreatedAt,
	DataType,
	DefaultScope,
	DeletedAt,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	UpdatedAt
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { Entry } from '../entry/entry.entity';
import { Comment } from '../comment/comment.entity';

const tableOptions: IDefineOptions = {
	timestamp: true,
	tableName: 'users'
} as IDefineOptions;

@DefaultScope({
	include: [() => Entry]
})
@Table(tableOptions)
export class User extends Model<User> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.BIGINT)
	public id: number;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	public firstName: string;

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	public lastName: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
			isUnique: async (value: string, next: any): Promise<any> => {
				const isExist = await User.findOne({ where: { email: value } });
				if (isExist) {
					const error = new Error('The email is already used.');
					next(error);
				}
				next();
			}
		}
	})
	public email: string;

	@Column({
		type: DataType.TEXT,
		allowNull: false
	})
	public password: string;

	@Column({ type: DataType.DATEONLY })
	public birthday: Date;

	@CreatedAt public createdAt: Date;

	@UpdatedAt public updatedAt: Date;

	@DeletedAt public deletedAt: Date;

	@HasMany(() => Entry)
	public entries: Entry[];

	@HasMany(() => Comment)
	public comments: Comment[];

	@BeforeValidate
	public static validateData(user: User, options: any) {
		if (!options.transaction) throw new Error('Missing transaction.');
	}

	@BeforeCreate
	public static async hashPassword(user: User, options: any) {
		if (!options.transaction) throw new Error('Missing transaction.');

		user.password = crypto
			.createHmac('sha256', user.password)
			.digest('hex');
	}
}
