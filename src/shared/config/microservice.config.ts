import { CustomStrategy } from '@nestjs/microservices';
import { RabbitMQTransportServer } from '../transports/rabbitmg-transport.server';

export const microserviceConfig = {
	url: process.env.AMQP_URL
};

export const microserviceServerConfig: (
	channel: string
) => CustomStrategy = channel => {
	return {
		strategy: new RabbitMQTransportServer(microserviceConfig.url, channel)
	};
};
