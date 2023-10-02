const Sequelize = require('sequelize');
const db = require('../db');

const Community = db.define('Community', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false,
    unique: {
      msg: 'Name already taken',
    },
  },
  slug: {
    type: Sequelize.STRING(255),
    allowNull: false,
    unique: {
      msg: 'slug already created',
    },
  },
  owner: {
    type: Sequelize.STRING,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = Community;
