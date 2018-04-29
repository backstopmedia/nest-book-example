import { Middleware, NestMiddleware, ExpressMiddleware, HttpStatus } from '@nestjs/common';
import { EntryService } from '../../modules/entry/entry.service';

@Middleware()
export class FetchEntryMiddleware implements NestMiddleware {
    constructor(private entryService: EntryService) { }

    async resolve(strategy: string): Promise<ExpressMiddleware> {
        return async (req, res, next) => {
            if (!req.params.entryId) return res.status(HttpStatus.BAD_REQUEST).send('Missing entryId.');

            const entry = await this.entryService.findById(req.params.entryId);
            if (!entry) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the entry.');

            req.entry = entry;
            next();
        };
    }
}
