import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/mongo.config';
import { getall } from './routes/get';
import { add } from './routes/add';
import { update } from './routes/update';
import { deletes } from './routes/delete';
import { login } from './routes/login';
import Dotenv from 'dotenv'
import { uploads } from './routes/upload';

const app: Express = express();

// use Cors origin

app.use(express.json());

Dotenv.config()

app.use(
  cors({
    origin: [`http://localhost:${config.dest_port}`, `http://localhost:${config.admin_port}`],
    methods: config.methods,
    allowedHeaders: config.allowedHeaders,
  })
);

// all routes

app.use('/api', getall);
app.use('/api', add);
app.use('/api', update);
app.use('/api', deletes);
app.use('/api', login);
app.use('/api/', uploads);

app.get('/', (_req: Request, res: Response) => {
  return res.status(234).send('Hello, Hackir');
});

mongoose
  .connect(process.env.MONGO_URL as string || config.url.online.host)
  .then(() => {
    // Online Connection
    console.log('MongoDB Online connected successfully.');
    app.listen(config.url.online.port, () => {
      console.log(`Node TS application is listening on http://localhost:${config.url.online.port}`);
      console.log(`Server for Student Management System`);
    });
  })
  .catch(() => {
    // Offline Connection
    mongoose
      .connect(config.url.offline.host)
      .then(() => {
        console.log('MongoDB Offline connected successfully.');
        app.listen(config.url.offline.port, () => {
          console.log(`Node TS application is listening on http://localhost:${config.url.offline.port}`);
        });
      })
      .catch((e: Error) => {
        console.log('MongoDB connection failed with config.MongoUrl:', e.message);
      });
  });