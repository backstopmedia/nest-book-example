import * as amqp from 'amqplib';
import { Server, CustomTransportStrategy, ReadPacket, PacketId, WritePacket } from '@nestjs/microservices';
import { NO_PATTERN_MESSAGE } from '@nestjs/microservices/constants';
import { Observable } from 'rxjs';

export class RabbitMQTransportServer extends Server implements CustomTransportStrategy {
    private server: amqp.Connection = null;
    private channel: amqp.Channel = null;

    constructor(
        private readonly url: string,
        private readonly queue: string
    ) {
        super();
    }

    public async listen(callback: () => void) {
        await this.init();
        this.channel.consume(`${this.queue}_sub`, this.handleMessage.bind(this), {
            noAck: true,
        });
        callback();
    }

    public close() {
        this.channel && this.channel.close();
        this.server && this.server.close();
    }

    private async handleMessage(message: amqp.Message) {
        const { content } = message;
        const packet = JSON.parse(content.toString()) as ReadPacket & PacketId;
        const handler = this.messageHandlers[JSON.stringify(packet.pattern)];

        if (!handler) {
            return this.sendMessage({
                id: packet.id,
                err: NO_PATTERN_MESSAGE
            });
        }

        const response$ = this.transformToObservable(await handler(packet.data)) as Observable<any>;
        response$ && this.send(response$, data => this.sendMessage({
            id: packet.id,
            ...data
        }));
    }

    private sendMessage(packet: WritePacket & PacketId) {
        const buffer = Buffer.from(JSON.stringify(packet));
        this.channel.sendToQueue(`${this.queue}_pub`, buffer);
    }

    private async init() {
        this.server = await amqp.connect(this.url);
        this.channel = await this.server.createChannel();
        this.channel.assertQueue(`${this.queue}_sub`, { durable: false });
        this.channel.assertQueue(`${this.queue}_pub`, { durable: false });
    }
}
