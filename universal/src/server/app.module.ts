import { Module } from '@nestjs/common';
import { HeroesModule } from './modules/heroes/heroes.module';
import { ClientModule } from './modules/client/client.module';

@Module({
    imports: [HeroesModule, ClientModule.forRoot()]
})
export class ApplicationModule {}
