import { AuthenticationGatewayMiddleware } from '../../shared/middlewares/authentication.gateway.middleware';
import { CommentService } from '../../modules/comment/comment.service';
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsException, WsResponse } from '@nestjs/websockets';

@WebSocketGateway({
    middlewares: [AuthenticationGatewayMiddleware]
})
export class CommentGateway {
    @WebSocketServer() server;

    constructor(private readonly commentService: CommentService) { }

    @SubscribeMessage('indexComment')
    async index(client, data): Promise<WsResponse<any>> {
        if (!data.entryId) throw new WsException('Missing entry id.');

        const comments = await this.commentService.findAll({
            where: {entryId: data.entryId}
        });

        return { event: 'indexComment', data: comments };
    }

    @SubscribeMessage('showComment')
    async show(client, data): Promise<WsResponse<any>> {
        if (!data.entryId) throw new WsException('Missing entry id.');
        if (!data.commentId) throw new WsException('Missing comment id.');

        const comment = await this.commentService.findOne({
            where: {
                id: data.commentId,
                entryId: data.entryId
            }
        });

        return { event: 'showComment', data: comment };
    }
}