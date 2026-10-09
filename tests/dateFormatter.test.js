const { toIsoDate, daysBetween } = require('../src/utils/dateFormatter');

describe('dateFormatter', () => {
  test('formats a date as YYYY-MM-DD', () => {
    expect(toIsoDate(new Date('2026-03-15T10:30:00Z'))).toBe('2026-03-15');
  });

  test('counts whole days between two dates', () => {
    const a = new Date('2026-03-01T00:00:00Z');
    const b = new Date('2026-03-11T00:00:00Z');
    expect(daysBetween(a, b)).toBe(10);
  });

  test('is symmetric regardless of argument order', () => {
    const a = new Date('2026-03-01T00:00:00Z');
    const b = new Date('2026-03-11T00:00:00Z');
    expect(daysBetween(b, a)).toBe(daysBetween(a, b));
  });
});
