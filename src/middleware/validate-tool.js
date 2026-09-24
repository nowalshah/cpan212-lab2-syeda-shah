const CATEGORIES = ['power', 'hand', 'garden', 'cleaning'];
const CONDITIONS = ['new', 'good', 'worn'];

export function validateTool(req, res, next) {
  const body = req.body;

  // The body must be a JSON object (not missing, null, an array or a string).
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return res.status(400).json({ error: { message: 'Request body must be a JSON object' } });
  }

  const details = {}; // every invalid field goes here
  const value = {};   // only checked, cleaned fields go here

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (name.length < 2 || name.length > 60) {
    details.name = 'name must be 2 to 60 characters';
  } else {
    value.name = name;
  }

  if (!CATEGORIES.includes(body.category)) {
    details.category = `category must be one of: ${CATEGORIES.join(', ')}`;
  } else {
    value.category = body.category;
  }

  if (!CONDITIONS.includes(body.condition)) {
    details.condition = `condition must be one of: ${CONDITIONS.join(', ')}`;
  } else {
    value.condition = body.condition;
  }

  if (typeof body.available !== 'boolean') {
    details.available = 'available must be true or false';
  } else {
    value.available = body.available;
  }

  // Number.isInteger is false for 2.5 and for the string "3".
  if (!Number.isInteger(body.maxLoanDays) || body.maxLoanDays < 1 || body.maxLoanDays > 14) {
    details.maxLoanDays = 'maxLoanDays must be a whole number from 1 to 14';
  } else {
    value.maxLoanDays = body.maxLoanDays;
  }

  if (Object.keys(details).length > 0) {
    return res.status(400).json({ error: { message: 'Validation failed', details } });
  }

  req.tool = value; // the route handler uses this, never req.body
  next();
}