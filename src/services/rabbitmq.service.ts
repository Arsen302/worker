import * as amqp from 'amqplib/callback_api';

// Docker:
// add docker-compose file
// https://docs.docker.com/compose/
// https://docs.docker.com/get-started/overview/

// RabbitMQ:
// https://www.cloudamqp.com/blog/2015-05-18-part1-rabbitmq-for-beginners-what-is-rabbitmq.html
// https://www.cloudamqp.com/blog/2015-05-19-part2-2-rabbitmq-for-beginners_example-and-sample-code-node-js.html
// https://www.rabbitmq.com/getstarted.html
// https://stackify.com/message-queues-12-reasons/
// https://blog.logrocket.com/understanding-message-queuing-systems-using-rabbitmq/
// https://medium.com/hepsiburadatech/migrating-rabbitmq-in-a-high-traffic-setup-39d73fcc8b04
// https://medium.com/swlh/build-an-image-upload-application-with-react-nodejs-postgresql-and-s3-34fe13fbe572

// Singleton:
// https://refactoring.guru/ru/design-patterns/singleton
// https://metanit.com/sharp/patterns/2.3.php

class MessageBroker {
  async messageConsume(): Promise<void> {
    amqp.connect('amqp://localhost', (connError: any, connection: any) => {
      if (connError) {
        connError;
      }

      connection.createChannel((chanError: any, channel: any) => {
        if (chanError) {
          throw chanError;
        }

        const queue = 'data_queue';

        channel.assertQueue(queue, {
          durable: true,
        });

        channel.prefetch(1);
        console.log(
          '[*] Waiting for messages in %s. To exit press CTRL+C',
          queue
        );

        channel.consume(
          queue,
          (data: object[]) => {
            console.log(' [x] Received ', data);
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
