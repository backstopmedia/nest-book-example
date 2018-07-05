import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
