import { Controller, Get, Post, Put, Delete, HttpStatus, Res, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CheckLoggedInUserGuard } from '../../shared/guards/check-loggedIn-user.guard';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('users')
    @UseGuards(CheckLoggedInUserGuard)
    public async index(@Res() res) {
        const users = await this.userService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('users')
    public async create(@Body() body: any, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) return res.status(HttpStatus.BAD_REQUEST).send('Missing some information.');

        await this.userService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get('users/:userId')
    @UseGuards(CheckLoggedInUserGuard)
    public async show(@Param('userId') userId: number, @Res() res) {
        if (!userId) return res.status(HttpStatus.BAD_REQUEST).send('Missing userId.');

        const user = await this.userService.findById(userId);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('users/:userId')
    @UseGuards(CheckLoggedInUserGuard)
    public async update(@Param('userId') userId: number, @Body() body: any, @Res() res) {
        if (!userId) return res.status(HttpStatus.BAD_REQUEST).send('Missing userId.');

        await this.userService.update(userId, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete('users/:userId')
    @UseGuards(CheckLoggedInUserGuard)
    public async delete(@Param('userId') userId: number, @Res() res) {
        if (!userId) return res.status(HttpStatus.BAD_REQUEST).send('Missing userId.');

        await this.userService.delete(userId);
        return res.status(HttpStatus.OK).send();
    }
}
