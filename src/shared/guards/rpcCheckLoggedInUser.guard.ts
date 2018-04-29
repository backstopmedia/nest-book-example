import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';

@Guard()
export class RpcCheckLoggedInUserGuard implements CanActivate {
    canActivate(data, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return Number(data.userId) === data.user.id;
    }
}