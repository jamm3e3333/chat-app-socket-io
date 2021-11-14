import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import config from 'config';
import logger from './utils/logger';
import { version } from '../package.json';

const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');
 
const app = express();
 
const httpServer = createServer(app);

const io = new Server(httpServer, {
      cors: {
          origin: corsOrigin,
          credentials: true,
      }
});

app.get('/', (req, res) => {
    return res.send('<h1>Server is running</h1>');
});

 httpServer.listen(port, host, () => {
     logger.info(`Server is listening on port ${port}, version: ${version}`);
 })

