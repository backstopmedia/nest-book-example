import { APP_BASE_HREF } from '@angular/common';
import { NestApplication } from '@nestjs/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { AngularUniversalOptions } from '@nau/server/client/interfaces/angular-universal.interface';
import { environment } from '@nau/server/shared/config/environment';

export function setupUniversal(
  app: NestApplication,
  ngOptions: AngularUniversalOptions
) {
  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = ngOptions.bundle;

  app.setViewEngine('html');
  app.setBaseViewsDir(ngOptions.viewsPath);
  app.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP),
        {
          provide: APP_BASE_HREF,
          useValue: `http://localhost:${environment.port}`
        }
      ]
    })
  );
}
