import * as http from 'http';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RpcValidationFilter } from './shared/filters/rpcValidation.filter';
import { microserviceServerConfig } from './shared/config/microservice.config';
import { swaggerOptions } from './shared/config/swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const rpcApp = await NestFactory.createMicroservice(
        AppModule,
        microserviceServerConfig('nestjs_book')
    );
    rpcApp.useGlobalFilters(new RpcValidationFilter());

    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('/swagger', app, document);

    await rpcApp.listenAsync();
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
