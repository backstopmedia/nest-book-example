import { env } from 'process';
import { join } from 'path';

const cwd: string = process.cwd();

export const environment = {
    clientPaths: {
        dist: join(cwd, 'dist'),
        client: join(cwd, 'dist', 'angular.io-example'),
        server: join(cwd, 'dist', 'server')
    },
    port: env.PORT
};
