import express from 'express';
import http from 'http';
import morgan from 'morgan';

import config from './utils/config';

const app = express();

const server = http.createServer(app);

const port = 8080;

server.listen(port, ()=>{
	console.log('Listening');
});
