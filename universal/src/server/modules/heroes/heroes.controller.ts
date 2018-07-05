import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	Query
} from '@nestjs/common';
import { HeroesService } from './heroes.service';

@Controller('api/heroes')
export class HeroesController {
	constructor(private readonly heroesService: HeroesService) {}

	@Get()
	async listHeroes(@Query('name') name: string) {
		return this.heroesService.getHeroes(name);
	}

	@Post()
	async createHero(@Body() body) {
		if (!body || !body.name) {
			throw new HttpException(
				'Missing hero name',
				HttpStatus.BAD_REQUEST
			);
		}

		return this.heroesService.createHero(body.name);
	}

	@Get(':id')
	async getHero(@Param('id') id: string) {
		return this.heroesService.getHero(Number(id));
	}

	@Put('')
	async updateHero(@Body() body) {
		if (!body || !body.id || !body.name) {
			throw new HttpException(
				'Missing hero name',
				HttpStatus.BAD_REQUEST
			);
		}

		return this.heroesService.updateHero(Number(body.id), body.name);
	}

	@Delete(':id')
	async deleteHero(@Param('id') id: string) {
		this.heroesService.deleteHero(Number(id));
	}
}
