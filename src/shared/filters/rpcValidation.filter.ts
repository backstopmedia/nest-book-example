import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcValidationException } from '../exceptions/rpcValidation.exception';

@Catch(RpcValidationException)
export class RpcValidationFilter implements RpcExceptionFilter {
	public catch(exception: RpcValidationException) {
		return throwError({
			error_code: 'VALIDATION_FAILED',
			error_message: exception.getError(),
			errors: exception.validationErrors
		});
	}
}
