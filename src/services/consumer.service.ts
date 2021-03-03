import * as amqp from 'amqplib';
// import consume from '../utils/consume';
import { promiseConsume } from '../utils/consume';
import { converter } from './converter.service';

class MessageListner {
  async consume(): Promise<void> {
    try {
      const conn = await amqp.connect(`${process.env.AMQP_URL}`);
      console.log('Connection to rabbitmq created...');

      const ch = await conn.createChannel();
      console.log('Channel created...');

      const queue = 'data_queue';

      await ch.assertQueue(queue, { durable: false });

      await ch.prefetch(0);

      await promiseConsume(ch, queue)
        // .then((res: any) => JSON.parse(res.content.toString()))
        .then((res: any) => {
          console.log(res);
        })
        .catch((err) => console.error(err));

      // await consume(ch, queue);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new MessageListner();
