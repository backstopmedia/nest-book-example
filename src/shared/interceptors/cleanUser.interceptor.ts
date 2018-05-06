import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

@Interceptor()
export class CleanUserInterceptor implements NestInterceptor {
    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
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
