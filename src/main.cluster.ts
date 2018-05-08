import * as cluster from 'cluster';
import * as os from 'os';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RpcValidationFilter } from './shared/filters/rpcValidation.filter';
import { microserviceServerConfig } from './shared/config/microservice.config';

async function bootstrapApp() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder().build();
        // .setTitle('Blog example')
        // .setDescription('The blog API description')
        // .setVersion('1.0')
        // .addTag('blog')
        // .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api', app, document);

    await app.listen(process.env.PORT || 3000);
}

async function bootstrapRpc() {
    const rpcApp = await NestFactory.createMicroservice(
        AppModule,
        microserviceServerConfig('nestjs_book')
    );
    rpcApp.useGlobalFilters(new RpcValidationFilter());

    await rpcApp.listenAsync();
}

if (cluster.isMaster) {
    const appWorkers = [];
    const rpcWorkers = [];

    for (let i = 0; i < os.cpus().length; i++) {
        const app = cluster.fork({
            APP_TYPE: 'NestApplication'
        });
        const rpc = cluster.fork({
            APP_TYPE: 'NestMicroservice'
        });

        appWorkers.push(app);
        rpcWorkers.push(rpc);
    }

    cluster.on('exit', function(worker, code, signal) {
        if (appWorkers.indexOf(worker) > -1) {
            const index = appWorkers.indexOf(worker);
            const app = cluster.fork({
                APP_TYPE: 'NestApplication'
            });
            appWorkers.splice(index, 1, app);
        } else if (rpcWorkers.indexOf(worker) > -1) {
            const index = rpcWorkers.indexOf(worker);
            const rpc = cluster.fork({
                APP_TYPE: 'NestMicroservice'
            });
            rpcWorkers.splice(index, 1, rpc);
        }
    });
} else {
    if (process.env.APP_TYPE === 'NestApplication') {
        bootstrapApp();
    } else if (process.env.APP_TYPE === 'NestMicroservice') {
        bootstrapRpc();
    }
}
