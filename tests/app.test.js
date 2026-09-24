const request = require('supertest');
const createApp = require('../src/app');
const repo = require('../src/repositories/orderRepository');
const inventory = require('../src/services/inventoryService');
const { resetForTests: resetIds } = require('../src/utils/idGenerator');

describe('orders API', () => {
  let app;

  beforeEach(() => {
    resetIds();
    repo.resetForTests();
    inventory.resetForTests({ 'SKU-1': 5 });
    app = createApp();
  });

  test('POST /orders creates an order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ customerId: 'c1', items: [{ sku: 'SKU-1', quantity: 2 }] });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('created');
  });

  test('POST /orders with invalid payload returns 400', async () => {
    const res = await request(app).post('/orders').send({});
    expect(res.status).toBe(400);
  });

  test('GET /orders/:id returns 404 for unknown order', async () => {
    const res = await request(app).get('/orders/does-not-exist');
    expect(res.status).toBe(404);
  });

  test('GET /orders lists orders', async () => {
    await request(app).post('/orders').send({ customerId: 'c1', items: [{ sku: 'SKU-1', quantity: 1 }] });
    const res = await request(app).get('/orders');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
});
