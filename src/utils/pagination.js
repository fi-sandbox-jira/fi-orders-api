'use strict';

// Not covered by tests - reserved for a future paginated GET /orders listing;
// see github/CLAUDE.md, "Требования к содержимому репозиториев" (kept
// deliberately uncovered so this large repo lands near its ~80% target
// instead of ~100%).
function isValidPage(page, pageSize) {
  return Number.isInteger(page) && page > 0 && Number.isInteger(pageSize) && pageSize > 0;
}

function paginate(items, page, pageSize) {
  if (!isValidPage(page, pageSize)) {
    throw new Error('page and pageSize must be positive integers');
  }
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return {
    items: items.slice(start, end),
    page,
    pageSize,
    total: items.length,
    totalPages: Math.ceil(items.length / pageSize),
  };
}

module.exports = { paginate, isValidPage };
