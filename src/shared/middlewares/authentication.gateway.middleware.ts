import * as jwt from 'jsonwebtoken';
import { GatewayMiddleware, WsException } from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';

@Injectable()
export class AuthenticationGatewayMiddleware implements GatewayMiddleware {
    constructor(private readonly userService: UserService) {}
    resolve() {
        return (socket, next) => {
            if (!socket.handshake.query.auth_token) {
                throw new WsException('Missing token.');
            }

            return jwt.verify(
                socket.handshake.query.auth_token,
                'secret',
                async (err, payload) => {
                    if (err) throw new WsException(err);

                    const user = await this.userService.findOne({
                        where: { email: payload.email }
                    });
                    socket.handshake.user = user;
                    return next();
                }
            );
        };
    }
}
