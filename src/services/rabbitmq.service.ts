import * as amqp from 'amqplib';

class MessageBroker {
  async messageConsume(photo: any): Promise<void> {
    amqp.connect('amqp://localhost', (connError: any, connection: any) => {
      if (connError) {
        connError;
      }
      connection.createChannel((chanError: any, channel: any) => {
        if (chanError) {
          throw chanError;
        }
        const queue = 'data_queue';
        const data = photo;

        channel.assertQueue(queue, {
          durable: true,
        });
        channel.prefetch(1);
        console.log(
          ' [*] Waiting for messages in %s. To exit press CTRL+C',
          queue
        );

        channel.consume(
          queue,
          (data: object[]) => {
            console.log(' [x] Received %s', data);
            setTimeout(() => {
              console.log('[x] Done');
              channel.ack(data);
            }, 1000);
          },
          {
            noAck: false,
          }
        );
      });
    });
  }
}

export default new MessageBroker();
