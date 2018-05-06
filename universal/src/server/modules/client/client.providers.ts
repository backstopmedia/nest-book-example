import { NestApplication } from '@nestjs/core';
import { setupUniversal } from './utils/setup-universal.utils';
import { ANGULAR_UNIVERSAL_OPTIONS } from './client.constants';
import { AngularUniversalOptions } from './interfaces/angular-universal-options.interface';
import { EXPRESS_REF } from '@nestjs/core/injector';

export const angularUniversalProviders = [
  {
    provide: 'UNIVERSAL_INITIALIZER',
    useFactory: (app: NestApplication, options: AngularUniversalOptions) => setupUniversal(app, options),
    inject: [EXPRESS_REF , ANGULAR_UNIVERSAL_OPTIONS]
  }
];
