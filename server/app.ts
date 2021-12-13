import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import {MONGO_URI} from './utils/config';

import blogsRouter from './routers/blogsRouter';

mongoose
  .connect(MONGO_URI || 'undefined')
  .then(() => {
    console.log('Connected to the DB');
  })
  .catch(err => {
    console.log('Failed connecting to the DB: ' + err.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/blogs', blogsRouter);

export default app;
