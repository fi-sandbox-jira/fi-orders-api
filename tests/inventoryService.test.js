const inventory = require('../src/services/inventoryService');

describe('inventoryService', () => {
  beforeEach(() => inventory.resetForTests({ 'SKU-1': 5 }));

  test('reserves available stock', () => {
    inventory.reserve('SKU-1', 3);
    expect(inventory.getStock('SKU-1')).toBe(2);
  });

  test('throws on insufficient stock', () => {
    expect(() => inventory.reserve('SKU-1', 10)).toThrow(/Insufficient stock/);
  });

  test('unknown sku has zero stock', () => {
    expect(inventory.getStock('UNKNOWN')).toBe(0);
  });
});
