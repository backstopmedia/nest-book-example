import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { environment } from '@nau/server/shared/config/environment';
import { ApplicationModule } from './app.module';

declare const module: any;

async function bootstrap() {
  if (environment.production) {
    enableProdMode();
  }

  const app = await NestFactory.create(ApplicationModule.moduleFactory());

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(environment.port);
}

bootstrap()
  .then(() => console.log(`Server started on port ${environment.port}`))
  .catch(err => console.error(`Server startup failed`, err));
