import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authenticationService: AuthenticationService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true,
            secretOrKey: 'secret'
        }, async (req, payload, next) => {
            return await this.verify(req, payload, next);
        });
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const isValid = await this.authenticationService.validateUser(payload);
        if (!isValid) {
            return done('Unauthorized', null);
        } else {
            return done(null, payload);
        }
    }
}
