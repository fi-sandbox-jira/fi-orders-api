const logger = require('../src/utils/logger');

describe('logger', () => {
  afterEach(() => jest.restoreAllMocks());

  test('info writes a prefixed line to stdout', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('hello');
    expect(spy).toHaveBeenCalledWith('[INFO] hello');
  });

  test('error writes a prefixed line to stderr', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('failed');
    expect(spy).toHaveBeenCalledWith('[ERROR] failed');
  });
});
