'use strict';

const orders = new Map();

function save(order) {
  orders.set(order.id, order);
  return order;
}

function findById(id) {
  return orders.get(id) || null;
}

function list() {
  return Array.from(orders.values());
}

function resetForTests() {
  orders.clear();
}

module.exports = { save, findById, list, resetForTests };
