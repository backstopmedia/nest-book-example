import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { userProvider } from './user.provider';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import * as passport from 'passport';


@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    components: [userProvider, UserService],
    exports: [UserService]
})
export class UserModule {}
