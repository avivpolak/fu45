import express from 'express';
import http from 'http';
import morgan from 'morgan';

import { PORT, MONGO_URI } from './utils/config';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

const server = http.createServer(app);

server.listen(PORT, ()=>{
	console.log('Listening');
});
