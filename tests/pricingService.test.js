const { calculateTotal, unitPrice, BULK_DISCOUNT_THRESHOLD } = require('../src/services/pricingService');

describe('pricingService', () => {
  test('calculates subtotal without discount below threshold', () => {
    const total = calculateTotal([{ sku: 'SKU-1', quantity: 2 }]);
    expect(total).toBeCloseTo(unitPrice('SKU-1') * 2, 2);
  });

  test('applies bulk discount at threshold', () => {
    const items = [{ sku: 'SKU-3', quantity: BULK_DISCOUNT_THRESHOLD }];
    const subtotal = unitPrice('SKU-3') * BULK_DISCOUNT_THRESHOLD;
    const total = calculateTotal(items);
    expect(total).toBeLessThan(subtotal);
  });

  test('throws on unknown sku', () => {
    expect(() => unitPrice('NOPE')).toThrow(/Unknown SKU/);
  });
});
