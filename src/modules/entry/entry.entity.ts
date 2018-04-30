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
    ForeignKey,
    AutoIncrement,
    BelongsTo,
    DefaultScope,
    HasMany
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { User } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'entries' } as IDefineOptions;

@DefaultScope({
    include: [() => Comment]
})
@Table(tableOptions)
export class Entry extends Model<Entry> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public content: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public userId: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
        
    })
    public keywords: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
    public deletedAt: Date;

    @HasMany(() => Comment)
    public comments: Comment[];

    @BelongsTo(() => User)
    public user: User;

    @BeforeValidate
    public static validateData(entry: Entry, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
    }
}
