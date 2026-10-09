const request = require('supertest');
const createApp = require('../src/app');
const repo = require('../src/repositories/orderRepository');
const inventory = require('../src/services/inventoryService');
const { resetForTests: resetIds } = require('../src/utils/idGenerator');

describe('GET /orders/:id', () => {
  let app;

  beforeEach(() => {
    resetIds();
    repo.resetForTests();
    inventory.resetForTests({ 'SKU-1': 5 });
    app = createApp();
  });

  test('returns a previously created order', async () => {
    const created = await request(app)
      .post('/orders')
      .send({ customerId: 'c1', items: [{ sku: 'SKU-1', quantity: 1 }] });
    const res = await request(app).get(`/orders/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(created.body);
  });
});
