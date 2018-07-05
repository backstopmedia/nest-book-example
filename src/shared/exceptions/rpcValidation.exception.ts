import { RpcException } from '@nestjs/microservices';
import { ValidationError } from 'class-validator';

export class RpcValidationException extends RpcException {
	constructor(public readonly validationErrors?: ValidationError[]) {
		super('Validation failed');
	}
}
