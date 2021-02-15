import * as amqp from 'amqplib';

// https://www.youtube.com/watch?v=XrkNwwVLyOY&t=236s
// https://habr.com/ru/post/447074/
// https://www.rabbitmq.com/getstarted.html
// https://stackify.com/message-queues-12-reasons/
// https://refactoring.guru/ru/design-patterns/singleton
// https://metanit.com/sharp/patterns/2.3.php
// https://medium.com/better-programming/implementing-rabbitmq-with-node-js-93e15a44a9cc
// https://medium.com/hepsiburadatech/migrating-rabbitmq-in-a-high-traffic-setup-39d73fcc8b04
// https://medium.com/swlh/build-an-image-upload-application-with-react-nodejs-postgresql-and-s3-34fe13fbe572

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
