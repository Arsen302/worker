import * as amqp from 'amqplib';
import * as util from 'util';

// оберни эту функцию в new promise, что бы использовать её в проекте через async/await
// Напиши реализацию через Promise и promisify
// [?]Как передавать данные msg из consume в converter???Спроси ментора!

// const channel = async (queue, msg) => {
//   const conn = await amqp.connect(`${process.env.AMQP_URL}`);
//   const ch = await conn.createChannel();
//   return new Promise (resolve, reject) {
//     resolve ch.consume(queue, (msg: any) => {
//     msg;
//     console.log('[x] Received', JSON.parse(msg.content.toString()));
//     ch.ack(msg);
//     console.log('[x] Done');
//   })
// }
// };

const consume = await util.promisify(ch.consume);

// 1. пишем callback функцию consume из consumer.service файла с аргументами
// https://www.youtube.com/watch?v=AAMwKmM0qG4
// https://www.youtube.com/watch?v=DHvZLI7Db8E&t=9s
// https://www.youtube.com/watch?v=ioypmC1oML0
// https://nodejs.dev/learn/understanding-javascript-promises

// ch.consume(
//   queue,
//   (msg: any) => {
//     converter(JSON.parse(msg.content.toString()));
//     console.log('[x] Received', JSON.parse(msg.content.toString()));
//     ch.ack(msg);
//     console.log('[x] Done');
//   },
//   {
//     noAck: false,
//   }
// );

// 2. присваиваем функцию consume через promisify и exportим ее в consumer

// export default const consume = await util.promisify(ch.consume)
