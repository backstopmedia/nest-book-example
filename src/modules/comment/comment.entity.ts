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
    DefaultScope
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { User } from '../user/user.entity';
import { Entry } from '../entry/entry.entity';

const tableOptions: IDefineOptions = {
    timestamp: true,
    tableName: 'comments'
} as IDefineOptions;

@Table(tableOptions)
export class Comment extends Model<Comment> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    public id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    public body: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public userId: number;

    @ForeignKey(() => Entry)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public entryId: number;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;

    @BelongsTo(() => User)
    public user: User;

    @BelongsTo(() => Entry)
    public entry: Entry;

    @BeforeValidate
    public static validateData(entry: Entry, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
    }
}
