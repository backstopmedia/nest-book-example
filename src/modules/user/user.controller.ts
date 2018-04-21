import {Controller, Get, Post, Put, Delete, HttpStatus, Res, Body, Param} from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('users')
    public async index(@Res() res) {
        const users = await this.userService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('users')
    public async create(@Body() body: any, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) throw new Error('Missing some information.');

        await this.userService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('users/:id')
    public async show(@Param() id: number, @Res() res) {
        if (!id) throw new Error('Missing id.');

        const user = await this.userService.findById(id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('users/:id')
    public async update(@Param() id: number, @Body() body: any, @Res() res) {
        if (!id) throw new Error('Missing id.');

        await this.userService.update(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('users/:id')
    public async delete(@Param() id: number, @Res() res) {
        if (!id) throw new Error('Missing id.');

        await this.userService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
