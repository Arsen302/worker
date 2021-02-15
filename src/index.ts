import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
// const DB_PORT = 3000 add this port in ormconfig when working from office;
// const DB_PORT = 5432 add this port in ormconfig when working from home;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const startConn = async (): Promise<void> => {
  try {
    await createConnection();
    console.log('DB started working!');
  } catch (err) {
    console.log('We have Error', err);
  }
};

startConn()
  .then((): void => {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  })
  .catch((err): void => {
    console.log(err);
  });
