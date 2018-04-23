import { CheckUserGuard } from '../../shared/guards/checkUser.guard';
import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Body, Param, UseGuards } from '@nestjs/common';
import { Entry } from './entry.entity';
import { EntryService } from './entry.service';
import { IEntry } from './interfaces';
import { IUser } from '../user/interfaces';
import { User } from '../../shared/decorators/user.decorator';

@Controller('users/:userId')
@UseGuards(CheckUserGuard)
export class EntryController {
    constructor(private readonly entryService: EntryService) { }

    @Get('entries')
    public async index(@User() user: IUser, @Res() res) {
        const entries = await this.entryService.findAll({ where: { userId: user.id }});
        return res.status(HttpStatus.OK).json(entries);
    }

    @Post('entries')
    public async create(@User() user: IUser, @Body() body: any, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) return res.status(HttpStatus.BAD_REQUEST).send('Missing some information.');

        const entry: IEntry = { ...body, userId: user.id };
        await this.entryService.create(entry);

        return res.status(HttpStatus.CREATED).send();
    }

    @Get('entries/:entryId')
    public async show(@User() user: IUser, @Param('entryId') entryId: number, @Res() res) {
        if (!entryId) return res.status(HttpStatus.BAD_REQUEST).send('Missing entryId.');

        const entry: Entry = await this.entryService.findById(entryId);
        if (!entry || entry.userId != user.id) {
            return res.status(HttpStatus.NOT_FOUND).send('Unable to find the entry.');
        }

        return res.status(HttpStatus.OK).json(entry);
    }

    @Put('entries/:entryId')
    public async update(@User() user: IUser, @Param('entryId') entryId: number, @Body() body: any, @Res() res) {
        if (!entryId) return res.status(HttpStatus.BAD_REQUEST).send('Missing entryId.');

        const entry = await this.entryService.findById(entryId);
        if (!entry || user.id != entry.userId) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the entry.');

        await this.entryService.update(entryId, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('entries/:entryId')
    public async delete(@User() user: IUser, @Param('entryId') entryId: number, @Res() res) {
        if (!entryId) return res.status(HttpStatus.BAD_REQUEST).send('Missing entryId.');

        const entry = await this.entryService.findById(entryId);
        if (!entry || user.id != entry.userId) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the entry.');

        await this.entryService.delete(entryId);
        return res.status(HttpStatus.OK).send();
    }
}
