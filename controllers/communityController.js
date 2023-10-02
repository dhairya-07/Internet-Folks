const Community = require('../models/Community');
const Role = require('../models/Role');
const Member = require('../models/Member');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { Snowflake } = require('@theinternetfolks/snowflake');
const slugify = require('slugify');
const sequelize = require('../db');
const { paginate } = require('../utils/paginate');
const AppError = require('../utils/appError');

const createCommunity = catchAsync(async (req, res, next) => {
  const owner = req.user.id;
  const { name } = req.body;
  if (!name) return next(new AppError('A name is required', 400));

  const id = Snowflake.generate();
  const slug = slugify(name, {
    replacement: '-',
    lower: true,
    trim: true,
  });

  const existingCommunity = await Community.findOne({
    where: { name: name.trim() },
  });
  if (existingCommunity) return next(new AppError('Name already taken', 400));

  const transaction = await sequelize.transaction();

  const newCommunity = await Community.create(
    { id, name: name.trim(), slug, owner },
    { transaction }
  );

  const adminRole = await Role.findOrCreate({
    where: { name: 'Community Admin' },
    defaults: {
      id: Snowflake.generate(),
      name: 'Community Admin',
    },
    transaction,
  });

  await Member.create(
    {
      community: newCommunity.id,
      user: owner,
      role: adminRole.id,
    },
    { transaction }
  );
  await transaction.commit();

  return res.status(201).json({
    status: true,
    content: {
      data: {
        newCommunity,
      },
    },
  });
});

const getMyOwnedCommunities = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;

  const communities = await Community.findAll(
    paginate(
      {
        where: {
          owner: req.user.id,
        },
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['id', 'name'],
          },
        ],
      },
      { page, limit }
    )
  );

  return res.status(200).json({
    status: true,
    content: {
      data: {
        communities,
      },
      meta: {
        total: communities.length,
        pages: communities.length / limit,
        page: page,
      },
    },
  });
});

const getMembers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  const members = await Member.findAll(
    paginate(
      {
        where: {
          community: id,
        },
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        page,
        limit,
      }
    )
  );

  return res.status(200).json({
    status: true,
    content: {
      data: {
        members,
      },
      meta: {
        total: members.length,
        pages: members.length / limit,
        page: page,
      },
    },
  });
});

const getAllCommunities = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;
  const communities = await Community.findAll(
    paginate(
      {
        where: {},
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name'],
          },
        ],
      },
      { page, limit }
    )
  );

  return res.status(200).json({
    status: true,
    content: {
      data: {
        communities,
      },
      meta: {
        total: communities.length,
        pages: communities.length / limit,
        page: page,
      },
    },
  });
});

const getMyJoinedCommunities = catchAsync(async (req, res, next) => {
  const { page, limit } = req.query;
  const communities = await Community.findAll(
    paginate({
      where: {
        owner: {
          $ne: req.user.id,
        },
      },
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name'],
        },
      ],
    })
  );

  return res.status(200).json({
    status: true,
    content: {
      data: {
        communities,
      },
      meta: {
        total: communities.length,
        pages: communities.length / limit,
        page: page,
      },
    },
  });
});

module.exports = {
  createCommunity,
  getMyOwnedCommunities,
  getMembers,
  getAllCommunities,
  getMyJoinedCommunities,
};
