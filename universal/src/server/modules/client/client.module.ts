import * as express from 'express';
import { Inject, Module } from '@nestjs/common';
import { DynamicModule, NestModule } from '@nestjs/common/interfaces';
import { NestApplication } from '@nestjs/core';
import { AngularUniversalOptions } from './interfaces/angular-universal-options.interface';
import { ANGULAR_UNIVERSAL_OPTIONS } from './client.constants';
import { ClientController } from './client.controller';
import { angularUniversalProviders } from './client.providers';
import { EXPRESS_REF } from '@nestjs/core/injector';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { environment } from '../../environments/environment';
import * as path from 'path';

function root(sub: string): string {
  return path.join(path.resolve(), sub);
}

@Module({
  controllers: [ClientController],
  components: [...angularUniversalProviders],
})
export class ClientModule implements NestModule {
  constructor(
    @Inject(ANGULAR_UNIVERSAL_OPTIONS) private readonly ngOptions: AngularUniversalOptions,
    @Inject(EXPRESS_REF ) private readonly app: NestApplication
  ) {}

  static forRoot(): DynamicModule {
    const options: AngularUniversalOptions = {
      viewsPath: environment.clientPaths.client,
      bundle: require('../../../main.server')
    };

    return {
      module: ClientModule,
      components: [
        {
          provide: ANGULAR_UNIVERSAL_OPTIONS,
          useValue: options,
        }
      ]
    };
  }

  configure(consumer: MiddlewaresConsumer): void {
    this.app.use(express.static(root('dist/angular.io-example')));
  }
}
