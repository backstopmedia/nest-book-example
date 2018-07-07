import { Controller, Get, Res, Req, Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';
import { ANGULAR_UNIVERSAL_OPTIONS } from '@nau/server/client/client.constants';
import { AngularUniversalOptions } from '@nau/server/client/interfaces/angular-universal.interface';

@Controller()
export class ClientController {
    constructor(
        @Inject(ANGULAR_UNIVERSAL_OPTIONS)
        private readonly ngOptions: AngularUniversalOptions
    ) {}

    @Get('*')
    render(@Res() res: Response, @Req() req: Request) {
        res.render(join(this.ngOptions.viewsPath, 'index.html'), { req });
    }
}
