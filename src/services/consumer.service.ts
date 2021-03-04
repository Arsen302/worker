import * as amqp from 'amqplib';
import consume from '../utils/consume';

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

      const result = await consume(ch, queue);

      return result;
    } catch (err) {
      console.error(err);
    }
  }
}

export default new MessageListner();
