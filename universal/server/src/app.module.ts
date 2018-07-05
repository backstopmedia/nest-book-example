import { Module, DynamicModule } from '@nestjs/common';
import { HeroesModule } from './heroes/heroes.module';
import { ClientModule } from './client/client.module';
import { environment } from '@nau/server/shared/config/environment';

@Module({})
export class ApplicationModule {
  static moduleFactory(): DynamicModule {
    return {
      module: ApplicationModule,
      imports: [
        HeroesModule,
        ...(environment.disableClientModule ? [] : [ClientModule.forRoot()])
      ]
    };
  }
}
