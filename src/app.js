import express from 'express';

export const app = express();

app.use(express.json());
// TODO: request logger middleware
// TODO: app.use('/api/tools', toolsRouter);
// TODO: 404 handler
// TODO: error handler (4 parameters)
