import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CheckLoggedInUserGuard } from '../../shared/guards/check-loggedIn-user.guard';
import { RpcValidationException } from '../../shared/exceptions/rpcValidation.exception';
import { CreateUserRequest } from './requests/create-user.request';
import { RpcCheckLoggedInUserGuard } from '../../shared/guards/rpcCheckLoggedInUser.guard';
import { CleanUserInterceptor } from '../../shared/interceptors/cleanUser.interceptor';
import { UpdateUserRequest } from './requests/update-user.request';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiUseTags('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject('ClientProxy') private readonly client: ClientProxy
    ) {}

    @Get('users')
    @UseGuards(CheckLoggedInUserGuard)
    @ApiBearerAuth()
    public async index(@Res() res) {
        this.client.send({ cmd: 'users.index' }, {}).subscribe({
            next: users => {
                res.status(HttpStatus.OK).json(users);
            },
            error: error => {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
            }
        });
    }

    @MessagePattern({ cmd: 'users.index' })
    @UseGuards(CheckLoggedInUserGuard)
    public async rpcIndex() {
        const users = await this.userService.findAll();
        return users;
    }

    @Post('users')
    public async create(@Body() body: CreateUserRequest, @Res() res) {
        this.client.send({ cmd: 'users.create' }, body).subscribe({
            next: () => {
                res.status(HttpStatus.CREATED).send();
            },
            error: error => {
                if (error.error_code === 'VALIDATION_FAILED') {
                    res.status(HttpStatus.BAD_REQUEST).send(error);
                } else {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
                }
            }
        });
    }

    @MessagePattern({ cmd: 'users.create' })
    public async rpcCreate(data: CreateUserRequest) {
        if (!data || (data && Object.keys(data).length === 0))
            throw new RpcValidationException();
        await this.userService.create(data);
    }

    @Get('users/:userId')
    @UseGuards(CheckLoggedInUserGuard)
    @ApiBearerAuth()
    public async show(@Param('userId') userId: number, @Req() req, @Res() res) {
        this.client
            .send({ cmd: 'users.show' }, { userId, user: req.user })
            .subscribe({
                next: user => {
                    res.status(HttpStatus.OK).json(user);
                },
                error: error => {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
                }
            });
    }

    @MessagePattern({ cmd: 'users.show' })
    @UseGuards(RpcCheckLoggedInUserGuard)
    @UseInterceptors(CleanUserInterceptor)
    public async rpcShow(data: any) {
        return await this.userService.findById(data.userId);
    }

    @Put('users/:userId')
    @UseGuards(CheckLoggedInUserGuard)
    @ApiBearerAuth()
    public async update(
        @Param('userId') userId: number,
        @Body() body: UpdateUserRequest,
        @Req() req,
        @Res() res
    ) {
        this.client
            .send({ cmd: 'users.update' }, { userId, body, user: req.user })
            .subscribe({
                next: () => {
                    res.status(HttpStatus.OK).send();
                },
                error: error => {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
                }
            });
    }

    @MessagePattern({ cmd: 'users.update' })
    @UseGuards(RpcCheckLoggedInUserGuard)
    public async rpcUpdate(data: any) {
        await this.userService.update(data.userId, data.body);
    }

    @Delete('users/:userId')
    @UseGuards(CheckLoggedInUserGuard)
    @ApiBearerAuth()
    public async delete(
        @Param('userId') userId: number,
        @Req() req,
        @Res() res
    ) {
        this.client
            .send({ cmd: 'users.delete' }, { userId, user: req.user })
            .subscribe({
                next: () => {
                    res.status(HttpStatus.OK).send();
                },
                error: error => {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
                }
            });
    }

    @MessagePattern({ cmd: 'users.delete' })
    @UseGuards(RpcCheckLoggedInUserGuard)
    public async rpcDelete(data: any) {
        await this.userService.delete(data.userId);
    }
}
