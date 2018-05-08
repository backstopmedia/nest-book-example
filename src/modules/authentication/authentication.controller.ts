import * as crypto from 'crypto';
import { AuthenticationService } from './authentication.service';
import {
    Controller,
    Post,
    HttpStatus,
    HttpCode,
    Res,
    Body
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginRequest } from './requests/login.request';
import { ApiImplicitBody, ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags('authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() body: LoginRequest, @Res() res): Promise<any> {
        if (!body.email || !body.password) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send('Missing email or password.');
        }

        const user = await this.userService.findOne({
            where: {
                email: body.email,
                password: crypto
                    .createHmac('sha256', body.password)
                    .digest('hex')
            }
        });
        if (!user) {
            return res
                .status(HttpStatus.NOT_FOUND)
                .send('No user found with this email and password.');
        }

        const result = this.authenticationService.createToken(user.email);
        return res.json(result);
    }
}
