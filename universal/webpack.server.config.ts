import { join } from 'path';
import { env } from 'process';
import * as Webpack from 'webpack';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as nodeExternals from 'webpack-node-externals';
import { smart } from 'webpack-merge';
const StartServerPlugin = require('start-server-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

let config: Webpack.Configuration;
const baseConfig: Webpack.Configuration = {
    entry: { server: ['./server/src/main.ts'] },
    resolve: {
        extensions: ['.js', '.ts'],
        plugins: [
            new TsConfigPathsPlugin({
                configFileName: join(__dirname, 'tsconfig.json')
            })
        ]
    },
    target: 'node',
    mode: 'none',
    // this makes sure we include node_modules and other 3rd party libraries
    externals: [nodeExternals()],
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    configFileName: join(
                        __dirname,
                        'server',
                        'tsconfig.server.json'
                    ),
                    transpileOnly: true,
                    useCache: true,
                    cacheDirectory: join(
                        __dirname,
                        'node_modules',
                        '.cache',
                        '.awcache'
                    ),
                    reportFiles: ['server/**/*.ts', 'libs/**/*.ts']
                }
            }
        ]
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 500
    },
    plugins: [
        new HardSourceWebpackPlugin({
            cacheDirectory: join(
                __dirname,
                'node_modules',
                '.cache',
                'hard-source',
                '[confighash]'
            )
        })
    ]
};

if (env.NODE_ENV === 'production') {
    config = baseConfig;
} else {
    config = smart(
        { entry: { server: ['webpack/hot/poll?100'] } },
        baseConfig,
        {
            plugins: [
                new Webpack.HotModuleReplacementPlugin(),
                new StartServerPlugin({
                    name: 'server.js',
                    signal: true
                })
            ]
        }
    );
    config.externals = [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100']
        })
    ];
}

export default config;
