'use strict';

function roundToCents(amount) {
  return Math.round(amount * 100) / 100;
}

function formatUsd(amount) {
  return `$${roundToCents(amount).toFixed(2)}`;
}

module.exports = { roundToCents, formatUsd };
