import * as amqp from 'amqplib/callback_api';
import * as express from 'express';
// import converter from './converter.service';
import { converter } from './converter.service';

class MessageBroker {
  async messageConsume(): Promise<void> {
    amqp.connect('amqp://localhost:5672', (connError: any, conn: any) => {
      if (connError) {
        console.error(connError);
      }
      console.log('[x] Connection created...');

      conn.createChannel((chanError: any, ch: any) => {
        if (chanError) {
          console.error(chanError);
        }
        console.log('[x] Channel created...');

        const queue = 'data_queue';

        ch.assertQueue(queue, {
          durable: false,
        });

        ch.prefetch(false);

        ch.consume(
          queue,
          (image: any) => {
            console.log('[x] Received', JSON.parse(image.content.toString()));
            converter(image.content.toString());
            // converter.convertJpgToPng(req, res, data);
            setTimeout(() => {
              console.log('[x] Done');
              ch.ack(image);
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
