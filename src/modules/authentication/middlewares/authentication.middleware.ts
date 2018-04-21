import {Middleware, NestMiddleware, ExpressMiddleware, HttpStatus} from '@nestjs/common';
import * as passport from 'passport';
import { UserService } from '../../user/user.service';

@Middleware()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private userService: UserService) { }

    async resolve(...args: any[]): Promise<ExpressMiddleware> {
        return async (req, res, next) => {
            return passport.authenticate('jwt', async (...args: any[]) => {
                const [,  payload, err] = args;
                if (err) {
                    return res.status(HttpStatus.BAD_REQUEST).send('Unable to authenticate the user.');
                }

                const user = await this.userService.findOne({ where: { email: payload.email }});
                req.user = user;
                return next();
            })(req, res, next);
        };
    }
}
