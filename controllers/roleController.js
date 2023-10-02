const Role = require('../models/Role');
const catchAsync = require('../utils/catchAsync');
const { Snowflake } = require('@theinternetfolks/snowflake');
const paginate = require('../utils/paginate');

const createRole = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const id = Snowflake.generate();
  const newRole = await Role.create({ id, name });
  return res.status(200).json({
    status: true,
    content: {
      data: {
        newRole,
      },
    },
  });
});

const getAllRoles = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;
  const rows = await Role.count();
  const roles = await Role.findAll(paginate({ where: {} }, { page, limit }));
  return res.status(200).json({
    status: true,
    content: {
      data: {
        roles,
      },
      meta: {
        total: rows,
        pages: rows / limit,
        page: page,
      },
    },
  });
});

module.exports = {
  getAllRoles,
  createRole,
};
