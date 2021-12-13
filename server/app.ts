import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import {MONGO_URI} from './utils/config';

import notesRouter from './routers/notesRouter';

mongoose
  .connect(MONGO_URI || 'undefined')
  .then(() => {
    console.log('Connected to the DB');
  })
  .catch(err => {
    console.log('Failed connecting to the DB: ' + err.message);
  });

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/notes', notesRouter);

export default app;
