import * as amqp from 'amqplib';

// оберни эту функцию в new promise, что бы использовать её в проекте через async / await
// ch.consume(queue, (msg: any) => {
//     msg;
//     console.log('[x] Received', JSON.parse(msg.content.toString()));
//     ch.ack(msg);
//     console.log('[x] Done');
//   }),
