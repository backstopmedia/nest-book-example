import { Module } from '@nestjs/common';
import { userProvider } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RabbitMQTransportModule } from '../../shared/transports/rabbitmq-transport.module';


@Module({
    imports: [RabbitMQTransportModule],
    controllers: [UserController],
    providers: [userProvider, UserService],
    exports: [UserService]
})
export class UserModule {}
