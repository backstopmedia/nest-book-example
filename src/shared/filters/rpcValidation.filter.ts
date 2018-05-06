import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { RpcValidationException } from '../exceptions/rpcValidation.exception';

@Catch(RpcValidationException)
export class RpcValidationFilter implements RpcExceptionFilter {
    public catch(exception: RpcValidationException): ErrorObservable {
        return Observable.throw({
            error_code: 'VALIDATION_FAILED',
            error_message: exception.getError(),
            errors: exception.validationErrors
        });
    }
}