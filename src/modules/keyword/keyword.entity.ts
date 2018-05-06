import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BeforeValidate,
    PrimaryKey,
    AutoIncrement,
    DefaultScope,
    HasMany,
    BelongsToMany
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { Entry } from '../entry/entry.entity';
import { KeywordEntry } from './keywordEntry.entity';

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'keywords' } as IDefineOptions;

@DefaultScope({
    include: [() => Entry]
})
@Table(tableOptions)
export class Keyword extends Model<Keyword> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isUnique: async (value: string, next: any): Promise<any> => {
                const isExist = await Keyword.findOne({ where: { keyword: value } });
                if (isExist) {
                    const error = new Error('The keyword already exists.');
                    next(error);
                }
                next();
            },
        },
    })
    public keyword: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
    public deletedAt: Date;

    @BelongsToMany(() => Entry, () => KeywordEntry)
    public entries: Entry[];

    @BeforeValidate
    public static validateData(entry: Entry, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
    }
}
