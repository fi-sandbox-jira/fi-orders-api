const { validateOrder } = require('../src/validators/orderValidator');

describe('orderValidator', () => {
  test('rejects non-object payload', () => {
    expect(validateOrder(null)).toEqual(['Order payload must be an object']);
  });

  test('requires customerId and items', () => {
    const errors = validateOrder({});
    expect(errors).toContain('customerId is required');
    expect(errors).toContain('items must be a non-empty array');
  });

  test('validates item fields', () => {
    const errors = validateOrder({ customerId: 'c1', items: [{ quantity: 0 }] });
    expect(errors).toContain('items[0].sku is required');
    expect(errors).toContain('items[0].quantity must be a positive integer');
  });

  test('accepts a valid payload', () => {
    expect(validateOrder({ customerId: 'c1', items: [{ sku: 'SKU-1', quantity: 2 }] })).toEqual([]);
  });
});
