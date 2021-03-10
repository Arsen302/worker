import * as amqp from 'amqplib';

const promiseConsume = (ch: amqp.Channel, queue: string) => {
  return new Promise((resolve, reject) => {
    try {
      ch.consume(
        queue,
        (msg: any) => {
          resolve(msg);
          console.log('Received:', JSON.parse(msg.content.toString()));
          ch.ack(msg);
          console.log('Done!');
        },
        {
          noAck: false,
        }
      );
    } catch (err) {
      reject(console.error(err));
    }
  });
};

const consume = async (ch: amqp.Channel, queue: string) => {
  try {
    const data: any = await promiseConsume(ch, queue);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default consume;
