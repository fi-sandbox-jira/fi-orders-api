const { nextOrderId, resetForTests } = require('../src/utils/idGenerator');

describe('idGenerator', () => {
  beforeEach(() => resetForTests());

  test('generates unique increasing ids', () => {
    const a = nextOrderId();
    const b = nextOrderId();
    expect(a).not.toBe(b);
    expect(a).toMatch(/^ORD-\d+-1$/);
    expect(b).toMatch(/^ORD-\d+-2$/);
  });
});
