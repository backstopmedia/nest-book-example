import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RpcCheckLoggedInUserGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const data = context.switchToRpc().getData();
        return Number(data.userId) === data.user.id;
    }
}
