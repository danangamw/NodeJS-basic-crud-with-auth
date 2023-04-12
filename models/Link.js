const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

// by default sequelize add createdAt and updatedAt
const Link = db.define('link', {
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  title: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Link;
(async () => {
  await db.sync();
})();
