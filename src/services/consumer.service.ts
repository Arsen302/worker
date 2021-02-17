import * as amqp from 'amqplib/callback_api';

// RabbitMQ:
// https://www.cloudamqp.com/blog/2015-05-18-part1-rabbitmq-for-beginners-what-is-rabbitmq.html
// https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html
// https://stackify.com/message-queues-12-reasons/

// Singleton:
// https://refactoring.guru/ru/design-patterns/singleton
// https://metanit.com/sharp/patterns/2.3.php

class MessageBroker {
  async messageConsume(): Promise<void> {
    amqp.connect('amqp://localhost:5672', (connError: any, connection: any) => {
      if (connError) {
        console.error(connError);
      }
      console.log('[x] Connection created...');

      connection.createChannel((chanError: any, channel: any) => {
        if (chanError) {
          console.error(chanError);
        }
        console.log('[x] Channel created...');

        const queue = 'data_queue';

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.prefetch(1);

        const photo = null;

        channel.consume(
          queue,
          (data: any) => {
            console.log('[x] Received', data.content.toString());
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
