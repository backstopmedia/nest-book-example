import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ApplicationModule } from './app.module';
import { environment } from './environments/environment';

let app: INestApplication;

async function bootstrap() {
  if (environment.production) {
    enableProdMode();
  }

  app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(environment.port);

  console.log('Listening on port: ', environment.port);
}
bootstrap();

export async function close() {
  if (app) {
    await app.close();
  }
}
