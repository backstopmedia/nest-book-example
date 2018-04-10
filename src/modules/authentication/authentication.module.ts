import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtStrategy } from './passport/index';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './authentication.controller';
import {AuthenticationMiddleware} from './middlewares/authentication.middleware';

@Module({
    imports: [UserModule],
    controllers: [AuthenticationController],
    components: [
        AuthenticationService,
        AuthenticationMiddleware,
        JwtStrategy
    ],
    exports: [
        JwtStrategy,
        AuthenticationMiddleware
    ]
})
export class AuthenticationModule {}
