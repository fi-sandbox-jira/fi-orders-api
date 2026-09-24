'use strict';

const express = require('express');
const ordersRouter = require('./routes/orders');
const errorHandler = require('./middleware/errorHandler');

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/orders', ordersRouter);
  app.use(errorHandler);
  return app;
}

module.exports = createApp;
