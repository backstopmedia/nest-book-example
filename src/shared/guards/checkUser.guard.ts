import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';

@Guard()
export class CheckUserGuard implements CanActivate {
    canActivate(req, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if (req.params.userId !== req.user.id) {
            return false;
        }
        return true;
    }
}