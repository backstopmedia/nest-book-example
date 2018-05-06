import { Module } from '@nestjs/common';
import { RabbitMQTransportClient } from './rabbitmq-transport.client';
import { microserviceConfig } from '../config/microservice.config';

const ClientProxy = {
  provide: 'ClientProxy',
  useFactory: () => new RabbitMQTransportClient(microserviceConfig.url, 'nestjs_book')
};

@Module({
    imports: [],
    controllers: [],
    components: [ClientProxy],
    exports: [ClientProxy]
})
export class RabbitMQTransportModule {}
