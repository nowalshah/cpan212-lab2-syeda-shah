import { Router } from 'express';
import { tools } from '../data/tools.js';

export const toolsRouter = Router();

// GET /api/tools -> every tool
toolsRouter.get('/', (req, res) => {
  res.json({ data: tools });
});

// GET /api/tools/:id -> one tool, or 404
toolsRouter.get('/:id', (req, res) => {
  const tool = tools.find((t) => t.id === req.params.id);
  if (!tool) {
    return res.status(404).json({ error: { message: 'Tool not found' } });
  }
  res.json({ data: tool });
});
