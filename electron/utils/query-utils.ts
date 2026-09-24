export function normalizeSort(
  sort: string,
  direction: string,
  allowed: Set<string>,
  fallback: { sort: string; direction: string },
): { finalSort: string; finalSortDirection: string } {
  const avilableSortDirection = new Set(["asc", "desc"]);

  return {
    finalSort: allowed.has(sort) ? sort : fallback.sort,
    finalSortDirection: avilableSortDirection.has(direction)
      ? direction
      : fallback.direction,
  };
}

export function buildSkip(page: number, limit: number) {
  return Number(page - 1) * Number(limit);
}

export function buildPageMeta(
  total = 0,
  page = 1,
  limit = 10,
): { total_data: number; total_pages: number; page: number; limit: number } {
  return {
    total_data: total,
    total_pages: Math.ceil(Number(total) / Number(limit)),
    page,
    limit,
  };
}
