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
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

Community.associate = (models) => {
  Community.belongsTo(models.User, {
    foreignKey: 'owner',
    as: 'Owner',
  });
};

module.exports = Community;
