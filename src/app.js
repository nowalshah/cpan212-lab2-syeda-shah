import express from 'express';
import { requestLogger } from './middleware/logger.js';
import { toolsRouter } from './routes/tools.routes.js';

export const app = express();

// Logger first, so it also sees requests that fail while parsing JSON.
app.use(requestLogger);
app.use(express.json());
app.use('/api/tools', toolsRouter);
// TODO: 404 handler
// TODO: error handler (4 parameters)
