const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

// by default sequelize add createdAt and updatedAt
const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  displayname: {
    type: DataTypes.STRING,
  },
});

module.exports = User;

(async () => {
  await db.sync();
})();
