const Seqeulize = require('sequelize');
const db = require('../db');
const bcrypt = require('bcryptjs');

const User = db.define('User', {
  id: {
    type: Seqeulize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Seqeulize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A name is required',
      },
      len: {
        args: [2, 64],
        msg: 'Your name must be atleast 2 character long',
      },
    },
  },
  email: {
    type: Seqeulize.STRING(128),
    allowNull: false,
    unique: {
      msg: 'email already taken',
    },
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Seqeulize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'A password is required',
      },
      len: {
        args: [6, 64],
        msg: 'Your password must be atleast 6 character long',
      },
    },
  },
});

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

User.prototype.validatePassword = (candidatePassword, dbPassword) => {
  return bcrypt.compareSync(candidatePassword, dbPassword);
};

module.exports = User;
