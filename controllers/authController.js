const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { Snowflake } = require('@theinternetfolks/snowflake');
const User = require('../models/User');

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
  return token;
};

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userId = Snowflake.generate();
  const newUser = await User.create({
    id: userId,
    name,
    email,
    password,
  });
  const payload = {
    name,
    userId,
  };
  const token = signToken(payload);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  newUser.password = undefined;
  return res
    .cookie('jwt', token, cookieOptions)
    .status(200)
    .json({
      status: true,
      content: {
        data: {
          newUser,
        },
        meta: {
          access_token: token,
        },
      },
    });
});

const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide username and password', 403));
  }

  const user = await User.findOne({ where: { email } });

  if (!user || !user.validatePassword(password, user.password)) {
    return next(new AppError('Invalid username or password', 403));
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = signToken(payload);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .cookie('jwt', token, cookieOptions)
    .status(200)
    .json({
      status: true,
      content: {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt,
        },
        meta: {
          access_token: token,
        },
      },
    });
});

const protect = catchAsync(async (req, res, next) => {
  if (!req.cookies['jwt'])
    return next(new AppError('You are not logged in!', 403));

  const token = req.cookies['jwt'];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findByPk(decoded.id);

  if (!user) return next(new AppError('Invalid access token!', 403));

  user.password = undefined;
  req.user = user;
  next();
});

const restricTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Not_Allowed_Access', 403));
    }
    next();
  };

const getMe = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new AppError('No user found with this ID', 400));
  }
  return res.status(200).json({
    status: true,
    content: {
      data: {
        user,
      },
    },
  });
});

module.exports = {
  signup,
  signin,
  protect,
  restricTo,
  getMe,
};
