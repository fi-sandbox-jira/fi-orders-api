'use strict';

const { validateOrder } = require('../validators/orderValidator');
const { calculateTotal } = require('./pricingService');
const inventory = require('./inventoryService');
const repository = require('../repositories/orderRepository');
const { nextOrderId } = require('../utils/idGenerator');
const logger = require('../utils/logger');

class OrderValidationError extends Error {
  constructor(errors) {
    super('Order validation failed');
    this.name = 'OrderValidationError';
    this.errors = errors;
  }
}

class OrderNotFoundError extends Error {
  constructor(id) {
    super(`Order not found: ${id}`);
    this.name = 'OrderNotFoundError';
  }
}

function createOrder(payload) {
  const errors = validateOrder(payload);
  if (errors.length > 0) {
    throw new OrderValidationError(errors);
  }
  payload.items.forEach((item) => inventory.reserve(item.sku, item.quantity));
  const total = calculateTotal(payload.items);
  const order = {
    id: nextOrderId(),
    customerId: payload.customerId,
    items: payload.items,
    total,
    status: 'created',
    createdAt: new Date().toISOString(),
  };
  repository.save(order);
  logger.info(`Created order ${order.id} for ${order.customerId}`);
  return order;
}

function getOrder(id) {
  const order = repository.findById(id);
  if (!order) {
    throw new OrderNotFoundError(id);
  }
  return order;
}

function listOrders() {
  return repository.list();
}

module.exports = {
  createOrder,
  getOrder,
  listOrders,
  OrderValidationError,
  OrderNotFoundError,
};
