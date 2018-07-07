import { join } from 'path';
import { Module, Inject, MiddlewareConsumer } from '@nestjs/common';
import { DynamicModule, NestModule } from '@nestjs/common/interfaces';
import { NestApplication } from '@nestjs/core';
import { HTTP_SERVER_REF } from '@nestjs/core/injector';
import { ClientController } from '@nau/server/client/client.controller';
import { clientProviders } from '@nau/server/client/client.providers';
import { ANGULAR_UNIVERSAL_OPTIONS } from '@nau/server/client/client.constants';
import { AngularUniversalOptions } from '@nau/server/client/interfaces/angular-universal.interface';
import { environment } from '@nau/server/shared/config/environment';

declare const __webpack_require__: NodeRequire;
declare const __non_webpack_require__: NodeRequire;

@Module({
    controllers: [ClientController],
    providers: [...clientProviders]
})
export class ClientModule implements NestModule {
    constructor(
        @Inject(ANGULAR_UNIVERSAL_OPTIONS)
        private readonly ngOptions: AngularUniversalOptions,
        @Inject(HTTP_SERVER_REF) private readonly app: NestApplication
    ) {}

    static forRoot(): DynamicModule {
        const requireFn =
            typeof __webpack_require__ === 'function'
                ? __non_webpack_require__
                : require;
        const options: AngularUniversalOptions = {
            viewsPath: environment.clientPaths.app,
            bundle: requireFn(join(environment.clientPaths.server, 'main.js'))
        };

        return {
            module: ClientModule,
            components: [
                {
                    provide: ANGULAR_UNIVERSAL_OPTIONS,
                    useValue: options
                }
            ]
        };
    }

    configure(consumer: MiddlewareConsumer): void {
        this.app.useStaticAssets(this.ngOptions.viewsPath);
    }
}
