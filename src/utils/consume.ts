import * as amqp from 'amqplib';
import { promisify } from 'util';

// // Напиши реализацию через new Promise, замути свой promisify!!!

// const promiseConsume = (ch: amqp.Channel, queue: string) => {
//   return new Promise((resolve, reject) => {
//     try {
//       ch.consume(
//         queue,
//         (msg: any) => {
//           console.log('Received:', JSON.parse(msg.content.toString()));
//           ch.ack(msg);
//           console.log('Done!');
//           return resolve(msg);
//         },
//         {
//           noAck: false,
//         }
//       );
//     } catch (err) {
//       reject(console.error(err));
//     }
//   });
// };

// // вариант с async/await

// const consume = async (ch: amqp.Channel, queue: string) => {
//   try {
//     const data: any = await promiseConsume(ch, queue);
//     return data.content;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export default promiseConsume;
// export default consume;

//////////////////////////////////////

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

// // 3. создаем новую функцию consume используя синтаксис async/await
// // и exportим ее в consumer

// const consume = async (ch: amqp.Channel, queue: string) => {
//   try {
//     const data = await promiseConsume(ch, queue);
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export default consume;
