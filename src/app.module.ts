import { AuthenticationMiddleware } from './shared/middlewares/authentication.middleware';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CommentController } from './modules/comment/comment.controller';
import { CommentModule } from './modules/comment/comment.module';
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
        EntryModule,
        CommentModule
    ],
    controllers: [],
    components: [],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        const userControllerAuthenticatedRoutes = [
            { path: '/users', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.PUT },
            { path: '/users/:id', method: RequestMethod.DELETE }
        ];

        consumer
            .apply(AuthenticationMiddleware)
            .with(strategy)
            .forRoutes(
                ...userControllerAuthenticatedRoutes,
                EntryController,
                CommentController
            );
    }
}
