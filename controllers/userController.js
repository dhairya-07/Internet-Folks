const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  return res.status(200).json({ msg: 'Success', users });
});

const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return next(new AppError('No user found with this ID', 400));
  }
  return res.status(200).json({
    msg: 'Success',
    user,
  });
});

module.exports = {
  getAllUsers,
  getUser,
};
