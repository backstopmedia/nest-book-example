export interface IDatabaseConfigAttributes {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging: boolean | (() => void);
    force: boolean;
    timezone: string;
}

export interface IDatabaseConfig {
    development: IDatabaseConfigAttributes;
}
