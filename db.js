const Seqeulize = require('sequelize');

const sequelize = new Seqeulize('internet_folks', 'postgres', 'dhairya07.', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
