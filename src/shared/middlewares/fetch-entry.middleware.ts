import { Injectable, NestMiddleware, MiddlewareFunction, HttpStatus } from '@nestjs/common';
import { EntryService } from '../../modules/entry/entry.service';

@Injectable()
export class FetchEntryMiddleware implements NestMiddleware {
    constructor(private entryService: EntryService) { }

    async resolve(strategy: string): Promise<MiddlewareFunction> {
        return async (req, res, next) => {
            if (!req.params.entryId) return next();

            const entry = await this.entryService.findById(req.params.entryId);
            if (!entry) return res.status(HttpStatus.NOT_FOUND).send('Unable to find the entry.');

            req.entry = entry;
            next();
        };
    }
}
