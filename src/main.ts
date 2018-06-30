import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RpcValidationFilter } from './shared/filters/rpcValidation.filter';
import { microserviceServerConfig } from './shared/config/microservice.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //const rpcApp = await NestFactory.createMicroservice(AppModule, microserviceServerConfig('nestjs_book'));
    //rpcApp.useGlobalFilters(new RpcValidationFilter());
    
    //await rpcApp.listenAsync();
    await app.listen(process.env.PORT || 3000);
}

bootstrap();
