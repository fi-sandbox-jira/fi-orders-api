const repo = require('../src/repositories/orderRepository');

describe('orderRepository', () => {
  beforeEach(() => repo.resetForTests());

  test('saves and finds by id', () => {
    repo.save({ id: 'o1', total: 10 });
    expect(repo.findById('o1')).toEqual({ id: 'o1', total: 10 });
  });

  test('returns null for missing id', () => {
    expect(repo.findById('missing')).toBeNull();
  });

  test('lists all saved orders', () => {
    repo.save({ id: 'o1' });
    repo.save({ id: 'o2' });
    expect(repo.list()).toHaveLength(2);
  });
});
