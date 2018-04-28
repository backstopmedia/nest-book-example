import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { UserModule } from '../../modules/user/user.module';

@Module({
    imports: [UserModule],
    components: [UserGateway]
})
export class UserGatewayModule { }