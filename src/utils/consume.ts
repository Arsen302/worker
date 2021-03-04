import * as amqp from 'amqplib';
import { promisify } from 'util';

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

// consume with async/await syntax

const consume = async (ch: amqp.Channel, queue: string) => {
  try {
    const data: any = await promiseConsume(ch, queue);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export default consume;

///////////////////////////////////////////////////////

// // 1. пишем callback функцию consume

// const callbackConsume = (ch: amqp.Channel, queue: string) => {
//   try {
//     ch.consume(
//       queue,
//       (msg: any) => {
//         msg;
//         console.log('Received:', JSON.parse(msg.content.toString()));
//         ch.ack(msg);
//         console.log('Done!');
//       },
//       {
//         noAck: false,
//       }
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

// // 2. преобразовываем callback функию через promisify

// export const promiseConsume = promisify(callbackConsume);
