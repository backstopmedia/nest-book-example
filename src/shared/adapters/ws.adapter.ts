import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import * as WebSocket from 'ws';
import { INestApplication, WebSocketAdapter } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { UserModule } from '../../modules/user/user.module';
import { UserService } from '../../modules/user/user.service';
import { WsAuthenticationGatewayMiddleware } from '../middlewares/ws-authentication.gateway.middleware';
import { MessageMappingProperties } from '@nestjs/websockets';

export class WsAdapter implements WebSocketAdapter {
    constructor(private app: INestApplication) { }

    create(port: number) {
        return new WebSocket.Server({
            server: this.app.getHttpServer(),
            verifyClient: ({ origin, secure, req }, next) => {
                return (new WsAuthenticationGatewayMiddleware(this.app.select(UserModule).get(UserService))).resolve()(req, next);
            }
        });
    }

    bindClientConnect(server, callback: (...args: any[]) => void) {
        server.on('connection', callback);
    }

    bindMessageHandlers(client: WebSocket, handlers: MessageMappingProperties[], process: (data) => Observable<any>) {
        Observable.fromEvent(client, 'message')
            .switchMap((buffer) => this.bindMessageHandler(buffer, handlers, process))
            .filter((result) => !!result)
            .subscribe((response) => client.send(JSON.stringify(response)));
    }

    bindMessageHandler(buffer, handlers: MessageMappingProperties[], process: (data) => Observable<any>): Observable<any> {
        const data = JSON.parse(buffer.data);
        const messageHandler = handlers.find((handler) => handler.message === data.type);
        if (!messageHandler) {
            return Observable.empty();
        }
        const { callback } = messageHandler;
        return process(callback(data));
    }

    close(server) {
        server.close()
    }
}