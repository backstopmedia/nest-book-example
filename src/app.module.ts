import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthenticationMiddleware } from './modules/authentication/middlewares/authentication.middleware';

@Module({
    imports: [
        DatabaseModule,
        AuthenticationModule,
        UserModule
    ],
    controllers: [],
    components: [],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes(
                { path: '/users', method: RequestMethod.GET },
                { path: '/users/:id', method: RequestMethod.GET },
                { path: '/users/:id', method: RequestMethod.PUT },
                { path: '/users/:id', method: RequestMethod.DELETE }
            );
    }
}
