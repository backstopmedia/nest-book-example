import { Observable } from 'rxjs';

export interface IProtoUserService {
    show(data: any): Observable<any>;
}
