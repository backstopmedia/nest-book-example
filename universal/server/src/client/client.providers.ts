import { NestApplication } from '@nestjs/core';
import { HTTP_SERVER_REF } from '@nestjs/core/injector';
import { AngularUniversalOptions } from '@nau/server/client/interfaces/angular-universal.interface';
import { setupUniversal } from '@nau/server/client/utils/setup-universal';
import { ANGULAR_UNIVERSAL_OPTIONS } from '@nau/server/client/client.constants';

export const clientProviders = [
    {
        provide: 'UNIVERSAL_INITIALIZER',
        useFactory: async (
            app: NestApplication,
            options: AngularUniversalOptions
        ) => await setupUniversal(app, options),
        inject: [HTTP_SERVER_REF, ANGULAR_UNIVERSAL_OPTIONS]
    }
];
