import { env } from 'process';
import { join } from 'path';

const cwd: string = process.cwd();

export function isProduction() {
    return (env.NODE_ENV || '').toLowerCase() === 'production';
}

export function isClientModuleDisabled() {
    return (env.DISABLE_CLIENT_MODULE || '').toLowerCase() === 'true';
}

export const environment = {
    port: isProduction() ? env.PORT : 3000,
    production: isProduction(),
    clientPaths: {
        dist: join(cwd, 'dist'),
        app: join(cwd, 'dist', 'app'),
        server: join(cwd, 'dist', 'server')
    },
    disableClientModule: isClientModuleDisabled()
};
