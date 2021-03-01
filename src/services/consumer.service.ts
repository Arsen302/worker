import * as amqp from 'amqplib';
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

      ch.consume(
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
}

export default new MessageListner();
