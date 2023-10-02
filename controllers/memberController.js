const Member = require('../models/Member');
const Role = require('../models/Role');
const User = require('../models/User');
const Community = require('../models/Community');
const catchAsync = require('../utils/catchAsync');
const { Snowflake } = require('@theinternetfolks/snowflake');
const AppError = require('../utils/appError');

const createMember = catchAsync(async (req, res, next) => {
  const { community, user, role } = req.body;
  const id = Snowflake.generate();

  const communityData = await Community.findOne({ where: community });
  const userData = await User.findOne({ where: user });
  const roleData = await Role.findOne({ where: role });

  if (!communityData || !userData || !roleData)
    return next(
      new AppError(`Either community, user, or role doesn't exist`, 401)
    );

  const newMember = await Member.create({
    id,
    community: communityData.id,
    user: userData.id,
    role: roleData.id,
  });

  return res.status(201).json({
    status: true,
    content: {
      data: {
        newMember,
      },
    },
  });
});

const removeMember = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const member = await Member.findByPk(id);

  if (!member) return next(new AppError('No member found with this id', 404));

  await member.destroy();
  return res.status(204).json({
    status: true,
  });
});

module.exports = {
  createMember,
  removeMember,
};
