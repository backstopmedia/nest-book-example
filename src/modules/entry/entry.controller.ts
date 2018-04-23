import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Body, Param } from '@nestjs/common';
import { Entry } from './entry.entity';
import { EntryService } from './entry.service';
import { IEntry } from './interfaces';
import { IUser } from '../user/interfaces';
import { User } from '../../../decorators/user.decorator';

@Controller()
export class EntryController {
    constructor(private readonly entryService: EntryService) { }

    @Get('entries')
    public async index(@Res() res) {
        const entries = await this.entryService.findAll();
        return res.status(HttpStatus.OK).json(entries);
    }

    @Post('entries')
    public async create(@User() user: IUser, @Body() body: any, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) throw new Error('Missing some information.');

        const entry: IEntry = { ...body, userId: user.id };
        await this.entryService.create(entry);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('entries/:id')
    public async show(@Param() id: number, @Res() res) {
        if (!id) throw new Error('Missing id.');

        const entry: Entry = await this.entryService.findById(id);
        return res.status(HttpStatus.OK).json(entry);
    }

    @Put('entries/:id')
    public async update(@User() user: IUser, @Param() id: number, @Body() body: any, @Res() res) {
        if (!id) throw new Error('Missing id.');
        if (user.id !== body.userId) throw new Error('Unable to update an entry from another user.');

        await this.entryService.update(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('entries/:id')
    public async delete(@User() user: IUser, @Param() id: number, @Res() res) {
        if (!id) throw new Error('Missing id.');

        const entry = await this.entryService.findById(id);
        if (user.id !== entry.userId) throw new Error('Unable to delete an entry from another user.');

        await this.entryService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
