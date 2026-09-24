'use strict';

function validateOrder(payload) {
  if (!payload || typeof payload !== 'object') {
    return ['Order payload must be an object'];
  }

  const errors = [];
  if (!payload.customerId || typeof payload.customerId !== 'string') {
    errors.push('customerId is required');
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    errors.push('items must be a non-empty array');
  } else {
    payload.items.forEach((item, idx) => {
      if (!item.sku || typeof item.sku !== 'string') {
        errors.push(`items[${idx}].sku is required`);
      }
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        errors.push(`items[${idx}].quantity must be a positive integer`);
      }
    });
  }
  return errors;
}

module.exports = { validateOrder };
