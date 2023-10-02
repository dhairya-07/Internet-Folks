const Seqeulize = require('sequelize');

const sequelize = new Seqeulize('internet_folks', 'postgres', '<password>', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
