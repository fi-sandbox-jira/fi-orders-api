'use strict';

// Not covered by tests - see src/utils/pagination.js for the same note.
function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs(b.getTime() - a.getTime()) / msPerDay);
}

module.exports = { toIsoDate, daysBetween };
