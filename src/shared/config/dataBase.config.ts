import { IDatabaseConfig } from '../interfaces/index';

export const databaseConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USER || 'nest',
        password: process.env.DB_PASSWORD || 'nest',
        database: process.env.DB_NAME || 'nestbook',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
        force: true,
        timezone: '+02:00',
    }
};
