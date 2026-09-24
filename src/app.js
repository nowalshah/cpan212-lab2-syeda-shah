import express from 'express';
import { requestLogger } from './middleware/logger.js';
import { toolsRouter } from './routes/tools.routes.js';

export const app = express();

app.use(requestLogger);
app.use(express.json());
app.use('/api/tools', toolsRouter);

// Runs only if no route above matched.
app.use((req, res) => {
  res.status(404).json({ error: { message: `No route for ${req.method} ${req.originalUrl}` } });
});

// Four parameters = Express treats this as the error handler. It must be last.
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { message: 'Request body must be valid JSON' } });
  }
  console.error(err); // full error stays in the terminal, never sent to the client
  res.status(500).json({ error: { message: 'Internal server error' } });
});