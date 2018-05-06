import { Module } from '@nestjs/common';
import { HeroesModule } from './heroes/heroes.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    HeroesModule,
    ClientModule.forRoot()
  ],
})
export class ApplicationModule {}
