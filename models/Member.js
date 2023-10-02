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

Member.associate = (models) => {
  Member.belongsTo(models.User, {
    foreignKey: 'user',
    as: 'User',
  });
  Member.belongsTo(models.Community, {
    foreignKey: 'commmunity',
    as: 'Community',
  });
  Member.belongsTo(models.Role, {
    foreignKey: 'role',
    as: 'Role',
  });
};

module.exports = Member;
