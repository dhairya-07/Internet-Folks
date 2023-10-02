const Seqeulize = require('sequelize');
const db = require('../db');

const Role = db.define('Role', {
  id: {
    type: Seqeulize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Seqeulize.STRING(64),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please give a name to this role',
      },
      len: {
        args: [2, 64],
        msg: 'Role name should be atleast 2 character long',
      },
    },
  },
});

module.exports = Role;
