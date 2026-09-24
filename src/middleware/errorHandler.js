'use strict';

const { OrderValidationError, OrderNotFoundError } = require('../services/orderService');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof OrderValidationError) {
    return res.status(400).json({ error: err.message, details: err.errors });
  }
  if (err instanceof OrderNotFoundError) {
    return res.status(404).json({ error: err.message });
  }
  return res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;
