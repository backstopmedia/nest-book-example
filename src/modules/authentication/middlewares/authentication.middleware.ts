import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import * as passport from 'passport';
import { UserService } from '../../user/user.service';

@Middleware()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(private userService: UserService) { }

    async resolve(...args: any[]): Promise<ExpressMiddleware> {
        return async (req, res, next) => {
            console.log('toto');
            return passport.authenticate('jwt', async (err, { email }) => {
                if (err) throw new Error(err);

                const user = await this.userService.findOne({ where: { email }});
                req.user = user;
                console.log(req.user);
                return next();
            })(req, res, next);
        };
    }
}