import { Module } from '@nestjs/common';
import { userProvider } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
    imports: [],
    controllers: [UserController],
    components: [userProvider, UserService],
    exports: [UserService]
})
export class UserModule {}
