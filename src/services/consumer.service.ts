import * as amqp from 'amqplib';
import * as express from 'express';
// import converter from './converter.service';
import { converter } from './converter.service';

class MessageListner {
  async consume(): Promise<void> {
    try {
      const conn = await amqp.connect(`${process.env.AMQP_URL}`);
      console.log('[x] Connection created...');

      const ch = await conn.createChannel();
      console.log('[x] Channel created...');

      const queue = 'data_queue';

      await ch.assertQueue(queue, { durable: false });

      await ch.prefetch(0);

      await ch.consume(
        queue,
        (msg: any) => {
          converter(JSON.parse(msg.content.toString()));
          console.log('[x] Received', JSON.parse(msg.content.toString()));
          ch.ack(msg);
          console.log('[x] Done');
        },
        {
          noAck: false,
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  // async messageConsume(): Promise<void> {
  //   amqp.connect(process.env.AMQP_URL, (connError: any, conn: any) => {
  //     if (connError) {
  //       console.error(connError);
  //     }
  //     console.log('[x] Connection created...');

  //     conn.createChannel((chanError: any, ch: any) => {
  //       if (chanError) {
  //         console.error(chanError);
  //       }
  //       console.log('[x] Channel created...');

  //       const queue = 'data_queue';

  //       ch.assertQueue(queue, {
  //         durable: false,
  //       });

  //       ch.prefetch(false);

  //       async realizathion:
  //      ch.consume(
  //        queue,
  //        (msg) => {
  //        resolve(JSON.parse(msg));
  //        console.log('[x] Received', JSON.parse(msg.content.toString()));
  //        console.log('[x] Done');

  //      ch.ack(msg);
  //      },
  //        1000
  //      );

  // callback realizathion:
  //       ch.consume(
  //         queue,
  //         (image: any) => {
  //           console.log('[x] Received', JSON.parse(image.content.toString()));
  //           converter(image.content.toString());
  //           // converter.convertJpgToPng(req, res, data);
  //           setTimeout(() => {
  //             console.log('[x] Done');
  //             ch.ack(image);
  //           }, 1000);
  //         },
  //         {
  //           noAck: false,
  //         }
  //       );
  //     });
  //   });
  // }
}

export default new MessageListner();
