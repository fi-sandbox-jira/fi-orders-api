const errorHandler = require('../src/middleware/errorHandler');
const { OrderValidationError, OrderNotFoundError } = require('../src/services/orderService');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('errorHandler', () => {
  test('maps validation errors to 400 with details', () => {
    const res = mockRes();
    errorHandler(new OrderValidationError(['customerId is required']), {}, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Order validation failed',
      details: ['customerId is required'],
    });
  });

  test('maps not-found errors to 404', () => {
    const res = mockRes();
    errorHandler(new OrderNotFoundError('o1'), {}, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Order not found: o1' });
  });

  test('maps unexpected errors to a generic 500', () => {
    const res = mockRes();
    errorHandler(new Error('boom'), {}, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
