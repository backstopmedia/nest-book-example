import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { RabbitMQTransportServer } from '../transports/rabbitmg-transport.server';

export const microserviceConfig: NestMicroserviceOptions = {
    url: process.env.AMQP_URL
};

export const microserviceServerConfig: (channel: string) => NestMicroserviceOptions = channel => {
    return {
        strategy: new RabbitMQTransportServer(microserviceConfig.url, channel)
    }
};
