import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as dotenv from 'dotenv';
import messageListner from './services/consumer.service';
import { converter } from './services/converter.service';

const app = express();
dotenv.config();
const PORT = process.env.APP_PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startConn = async (): Promise<void> => {
  try {
    await createConnection();
    console.log('DB started working...');

    const rawMsg = await messageListner.consume();
    const msg = rawMsg;
    converter(msg);
  } catch (err) {
    console.error('We have Error...', err);
  }
};

startConn()
  .then((): void => {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
  })
  .catch((err): void => {
    console.error(err);
  });
