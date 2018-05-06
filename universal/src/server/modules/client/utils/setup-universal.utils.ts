import { APP_BASE_HREF } from '@angular/common';
import { NestApplication } from '@nestjs/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { AngularUniversalOptions } from '../interfaces/angular-universal-options.interface';
import { environment } from '../../../environments/environment';

export function setupUniversal(app: NestApplication, ngOptions: AngularUniversalOptions) {
  const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = ngOptions.bundle;

  app.set('view engine', 'html');
  app.set('views', ngOptions.viewsPath);
  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP),
      {
        provide: APP_BASE_HREF,
        useValue: `http://localhost:${environment.port}`
      }
    ]
  }));
}
