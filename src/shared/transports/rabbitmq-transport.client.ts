import * as amqp from 'amqplib';
import {
    ClientProxy,
    ReadPacket,
    WritePacket,
    PacketId
} from '@nestjs/microservices';
import { Subject } from 'rxjs';
import { filter, pluck, map, take } from 'rxjs/operators';

export class RabbitMQTransportClient extends ClientProxy {
    private server: amqp.Connection;
    private channel: amqp.Channel;
    private responsesSubject: Subject<amqp.Message>;

    constructor(private readonly url: string, private readonly queue: string) {
        super();
    }

    public async close() {
        this.channel && (await this.channel.close());
        this.server && (await this.server.close());
    }

    public connect(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                this.server = await amqp.connect(this.url);
                this.channel = await this.server.createChannel();

                const { sub, pub } = this.getQueues();
                await this.channel.assertQueue(sub, { durable: false });
                await this.channel.assertQueue(pub, { durable: false });

                this.responsesSubject = new Subject();
                this.channel.consume(
                    pub,
                    message => {
                        this.responsesSubject.next(message);
                    },
                    { noAck: true }
                );
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    protected publish(
        partialPacket: ReadPacket,
        callback: (packet: WritePacket) => void
    ) {
        const promises = [];
        if (!this.server || !this.channel) {
            promises.push(
                new Promise((resolve, reject) => {
                    this.connect()
                        .then(() => resolve())
                        .catch(e => reject(e));
                })
            );
        }

        Promise.all(promises).then(() => {
            const packet = this.assignPacketId(partialPacket);
            const { sub } = this.getQueues();

            this.responsesSubject
                .asObservable()
                .pipe(
                    pluck('content'),
                    map(
                        content =>
                            JSON.parse(content.toString()) as WritePacket &
                                PacketId
                    ),
                    filter(message => message.id === packet.id),
                    take(1)
                )
                .subscribe(({ err, response, isDisposed }) => {
                    if (isDisposed || err) {
                        callback({
                            err,
                            response: null,
                            isDisposed: true
                        });
                    }

                    callback({ err, response });
                });

            this.channel.sendToQueue(sub, Buffer.from(JSON.stringify(packet)));
        });
    }

    private getQueues() {
        return { pub: `${this.queue}_pub`, sub: `${this.queue}_sub` };
    }
}
