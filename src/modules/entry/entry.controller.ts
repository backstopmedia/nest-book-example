import { checkLoggedInUserGuard } from '../../shared/guards/checkLoggedInUser.guard';
import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Body, Param, UseGuards } from '@nestjs/common';
import { Entry } from '../../shared/decorators/entry.decorator';
import { EntryService } from './entry.service';
import { IEntry } from './interfaces';
import { IUser } from '../user/interfaces';
import { User } from '../../shared/decorators/user.decorator';

@Controller('users/:userId')
@UseGuards(checkLoggedInUserGuard)
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
    public async show(@User() user: IUser, @Entry() entry: IEntry, @Param('entryId') entryId: number, @Res() res) {
        return res.status(HttpStatus.OK).json(entry);
    }

    @Put('entries/:entryId')
    public async update(@User() user: IUser, @Entry() entry: IEntry, @Param('entryId') entryId: number, @Body() body: any, @Res() res) {
        await this.entryService.update(entryId, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('entries/:entryId')
    public async delete(@User() user: IUser, @Entry() entry: IEntry, @Param('entryId') entryId: number, @Res() res) {
        await this.entryService.delete(entryId);
        return res.status(HttpStatus.OK).send();
    }
}
