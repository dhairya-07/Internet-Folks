exports.paginate = (query, { page, pageLimit }) => {
  // starting with page number 1
  const offset = (page - 1) * pageLimit;
  const limit = pageLimit;

  return {
    ...query,
    offset,
    limit,
  };
};
