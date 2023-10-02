exports.paginate = (query, { page, pageLimit }) => {
  const offset = (page - 1) * pageLimit;
  const limit = pageLimit;

  return {
    ...query,
    offset,
    limit,
  };
};
