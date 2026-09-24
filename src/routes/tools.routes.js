import { Router } from 'express';
import { tools } from '../data/tools.js';
import { validateTool } from '../middleware/validate-tool.js';

export const toolsRouter = Router();

const CATEGORIES = ['power', 'hand', 'garden', 'cleaning'];

// GET /api/tools?category=garden&available=true
toolsRouter.get('/', (req, res) => {
  const { category, available } = req.query;
  const details = {};

  if (category !== undefined && !CATEGORIES.includes(category)) {
    details.category = `category must be one of: ${CATEGORIES.join(', ')}`;
  }
  if (available !== undefined && available !== 'true' && available !== 'false') {
    details.available = 'available must be true or false';
  }
  if (Object.keys(details).length > 0) {
    return res.status(400).json({ error: { message: 'Invalid query', details } });
  }

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

// PUT /api/tools/:id -> validateTool runs first, so a bad body is a 400
// even when the id is unknown (the lab requires this order).
toolsRouter.put('/:id', validateTool, (req, res) => {
  const index = tools.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: { message: 'Tool not found' } });
  }
  tools[index] = { id: req.params.id, ...req.tool }; // replace all five fields, keep the id
  res.json({ data: tools[index] });
});

// DELETE /api/tools/:id -> 204 with no body, or 404
toolsRouter.delete('/:id', (req, res) => {
  const index = tools.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: { message: 'Tool not found' } });
  }
  tools.splice(index, 1); // remove one item at that position
  res.status(204).end();
});