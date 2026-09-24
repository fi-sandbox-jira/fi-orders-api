const { roundToCents, formatUsd } = require('../src/utils/money');

describe('money', () => {
  test('rounds to cents', () => {
    expect(roundToCents(19.999)).toBe(20);
  });

  test('formats usd with two decimals', () => {
    expect(formatUsd(5)).toBe('$5.00');
    expect(formatUsd(19.999)).toBe('$20.00');
  });
});
