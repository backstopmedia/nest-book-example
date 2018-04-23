import { AuthenticationMiddleware } from './modules/authentication/middlewares/authentication.middleware';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DatabaseModule } from './modules/database/database.module';
import { EntryController } from './modules/entries/entry.controller';
import { EntryModule } from './modules/entries/entry.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { strategy } from './shared/index'
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
                { path: '/users/:id', method: RequestMethod.GET },
                { path: '/users/:id', method: RequestMethod.PUT },
                { path: '/users/:id', method: RequestMethod.DELETE }
            , EntryController);
    }
}
