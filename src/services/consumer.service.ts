import * as amqp from 'amqplib/callback_api';
import * as express from 'express';
// import converter from './converter.service';
import { converter } from './converter.service';

class MessageListner {
  async consume(): Promise<void> {
    return new Promise((resolve, reject) => {
      amqp.connect(process.env.AMQP_URL, (connError: any, conn: any) => {
        if (connError) {
          reject(connError);
        }
        console.log('[x] Connection created...');

        conn.createChannel(
          (chanError: any, ch: any) => {
            if (chanError) {
              console.error(chanError);
            }
            console.log('[x] Channel created...');

            const queue = 'data_queue';

            ch.assertQueue(queue, {
              durable: false,
            });

            ch.prefetch(false);

            ch.consume(queue, (msg: any) => resolve(msg), 1000);
          },
          {
            noAck: false,
          }
        );
      });
    });
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

export default new MessageListner();
