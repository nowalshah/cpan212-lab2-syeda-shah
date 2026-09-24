import { Router } from 'express';
import { tools } from '../data/tools.js';
import { validateTool } from '../middleware/validate-tool.js';

export const toolsRouter = Router();

const CATEGORIES = ['power', 'hand', 'garden', 'cleaning'];

// GET /api/tools?category=garden&available=true
toolsRouter.get('/', (req, res) => {
  const { category, available } = req.query;
  const details = {};

  // 1. Check each filter that was provided, and note every problem.
  if (category !== undefined && !CATEGORIES.includes(category)) {
    details.category = `category must be one of: ${CATEGORIES.join(', ')}`;
  }
  if (available !== undefined && available !== 'true' && available !== 'false') {
    details.available = 'available must be true or false';
  }
  if (Object.keys(details).length > 0) {
    return res.status(400).json({ error: { message: 'Invalid query', details } });
  }

  // 2. Apply the filters that were provided. Both together means both must match.
  let result = tools;
  if (category !== undefined) {
    result = result.filter((t) => t.category === category);
  }
  if (available !== undefined) {
    result = result.filter((t) => t.available === (available === 'true'));
  }
  res.json({ data: result });
});

// GET /api/tools/:id -> one tool, or 404
toolsRouter.get('/:id', (req, res) => {
  const tool = tools.find((t) => t.id === req.params.id);
  if (!tool) {
    return res.status(404).json({ error: { message: 'Tool not found' } });
  }
  res.json({ data: tool });
});

// POST /api/tools -> validateTool runs first; the handler only runs if the body is valid
toolsRouter.post('/', validateTool, (req, res) => {
  const tool = { id: crypto.randomUUID(), ...req.tool };
  tools.push(tool);
  res.status(201).json({ data: tool });
});
