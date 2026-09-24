'use strict';

const stock = new Map([
  ['SKU-1', 50],
  ['SKU-2', 10],
  ['SKU-3', 0],
]);

function getStock(sku) {
  return stock.has(sku) ? stock.get(sku) : 0;
}

function reserve(sku, quantity) {
  const available = getStock(sku);
  if (available < quantity) {
    throw new Error(`Insufficient stock for ${sku}: requested ${quantity}, available ${available}`);
  }
  stock.set(sku, available - quantity);
}

function resetForTests(initial) {
  stock.clear();
  Object.entries(initial || {}).forEach(([sku, qty]) => stock.set(sku, qty));
}

module.exports = { getStock, reserve, resetForTests };
