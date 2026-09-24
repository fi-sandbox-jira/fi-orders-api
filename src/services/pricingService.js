'use strict';

const { roundToCents } = require('../utils/money');

const UNIT_PRICES = {
  'SKU-1': 19.99,
  'SKU-2': 49.5,
  'SKU-3': 5,
};
const BULK_DISCOUNT_THRESHOLD = 10;
const BULK_DISCOUNT_RATE = 0.1;

function unitPrice(sku) {
  if (!(sku in UNIT_PRICES)) {
    throw new Error(`Unknown SKU: ${sku}`);
  }
  return UNIT_PRICES[sku];
}

function calculateTotal(items) {
  const subtotal = items.reduce((sum, item) => sum + unitPrice(item.sku) * item.quantity, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const discount = totalQuantity >= BULK_DISCOUNT_THRESHOLD ? subtotal * BULK_DISCOUNT_RATE : 0;
  return roundToCents(subtotal - discount);
}

module.exports = { unitPrice, calculateTotal, BULK_DISCOUNT_THRESHOLD };
