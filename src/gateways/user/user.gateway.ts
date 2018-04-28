import { AuthenticationGatewayMiddleware } from '../../shared/middlewares/authentication.gateway.middleware';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from '@nestjs/websockets';

@WebSocketGateway({
    middlewares: [AuthenticationGatewayMiddleware]
})
export class UserGateway {
    @WebSocketServer() server;

    @SubscribeMessage('showUser')
    show(client, data): WsResponse<any> {
        if (!data.userId) throw new WsException('Missing entry id.');
        if (client.handshake.user.id != data.userId) throw new WsException('Unable to find the user.');

        const user = client.handshake.user;
        return { event: 'showUser', data: user };
    }
}