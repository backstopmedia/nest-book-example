import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DatabaseModule } from './modules/database/database.module';
import { EntryController } from './modules/entry/entry.controller';
import { EntryModule } from './modules/entry/entry.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { strategy } from './shared/config/passportStrategy.config';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        DatabaseModule,
        AuthenticationModule.forRoot('jwt'),
        UserModule,
        EntryModule
    ],
    controllers: [],
    components: [],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .with(strategy)
            .forRoutes(
                { path: '/users', method: RequestMethod.GET },
                { path: '/users/:userId', method: RequestMethod.GET },
                { path: '/users/:userId', method: RequestMethod.PUT },
                { path: '/users/:userId', method: RequestMethod.DELETE }
            , EntryController);
    }
}
