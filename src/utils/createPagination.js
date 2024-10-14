export const createPagination = (page, perPage, count) => {
  const totalPages = Math.ceil(count / perPage);
  const hasPreviousPage =
    page > 1 && (page < totalPages || page === totalPages);
  const hasNextPage = page < totalPages;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};
