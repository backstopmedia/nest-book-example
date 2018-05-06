import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../../shared/config/dataBase.config';
import { User } from '../user/user.entity';
import { Entry } from '../entry/entry.entity';
import { Comment } from '../comment/comment.entity';
import { Keyword } from '../keyword/keyword.entity';
import { KeywordEntry } from '../keyword/keywordEntry.entity';

export const databaseProvider = {
    provide: 'SequelizeInstance',
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case 'prod':
            case 'production':
            case 'dev':
            case 'development':
            default:
                config = databaseConfig.development;
        }

        const sequelize = new Sequelize(config);
        sequelize.addModels([User, Entry, Comment, Keyword, KeywordEntry]);
        /* await sequelize.sync(); */
        return sequelize;
    },
};
