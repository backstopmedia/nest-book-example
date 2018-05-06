import {Component, HttpException, HttpStatus} from '@nestjs/common';
import { Hero } from '../../shared/hero';
import { HEROES } from './mock-heroes';

@Component()
export class HeroesService {
  private heroCache: Hero[];
  private nextId: number;

  constructor() {
    this.heroCache = HEROES;
    this.nextId = this.heroCache.reduce((id, hero) => {
      return Math.max(id, hero.id)
    }, 0) + 1;
  }

  getHeroes(name?: string) {
    if (name) {
      const regex = new RegExp(name, 'gi');
      return this.heroCache.filter(hero => regex.test(hero.name))
    }

    return this.heroCache;
  }

  createHero(name: string) {
    const hero = new Hero();
    hero.id = this.nextId++;
    hero.name = name;

    this.heroCache.push(hero);
    return hero;
  }

  getHero(id: number) {
    return this.heroCache.find(hero => hero.id === id);
  }

  updateHero(id: number, name: string) {
    const hero = this.getHero(id);

    if (!hero) {
      throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
    }

    hero.name = name;
  }

  deleteHero(id: number) {
    const heroIndex = this.heroCache.findIndex(hero => hero.id === id);

    if (heroIndex === -1) {
      throw new HttpException('Hero not found', HttpStatus.NOT_FOUND);
    }

    this.heroCache.splice(heroIndex, 1);
  }
}
