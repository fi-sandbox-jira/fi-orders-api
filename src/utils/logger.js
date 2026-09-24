'use strict';

function info(message) {
  // eslint-disable-next-line no-console
  console.log(`[INFO] ${message}`);
}

function error(message) {
  // eslint-disable-next-line no-console
  console.error(`[ERROR] ${message}`);
}

module.exports = { info, error };
