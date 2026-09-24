const orderService = require('../src/services/orderService');
const inventory = require('../src/services/inventoryService');
const repo = require('../src/repositories/orderRepository');
const { resetForTests: resetIds } = require('../src/utils/idGenerator');

describe('orderService', () => {
  beforeEach(() => {
    resetIds();
    repo.resetForTests();
    inventory.resetForTests({ 'SKU-1': 5 });
  });

  test('creates a valid order', () => {
    const order = orderService.createOrder({ customerId: 'c1', items: [{ sku: 'SKU-1', quantity: 2 }] });
    expect(order.status).toBe('created');
    expect(order.total).toBeGreaterThan(0);
    expect(orderService.getOrder(order.id)).toEqual(order);
  });

  test('throws OrderValidationError on bad payload', () => {
    expect(() => orderService.createOrder({})).toThrow(orderService.OrderValidationError);
  });

  test('throws OrderNotFoundError for unknown id', () => {
    expect(() => orderService.getOrder('missing')).toThrow(orderService.OrderNotFoundError);
  });

  test('lists created orders', () => {
    orderService.createOrder({ customerId: 'c1', items: [{ sku: 'SKU-1', quantity: 1 }] });
    expect(orderService.listOrders()).toHaveLength(1);
  });
});
