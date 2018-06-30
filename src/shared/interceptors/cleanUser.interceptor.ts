import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CleanUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        return stream$.pipe(
            map(user => JSON.parse(JSON.stringify(user))),
            map(user => {
                return {
                    ...user,
                    password: undefined
                };
            })
        );
    }
}
