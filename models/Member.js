const Sequelize = require('sequelize');
const db = require('../db');

const Member = db.define('Member', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  community: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'Communities',
      key: 'id',
    },
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
});

module.exports = Member;
