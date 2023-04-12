const { Sequelize } = require('sequelize');

const db = new Sequelize('crud_links', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = db;
