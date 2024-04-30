const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Test = sequelize.define('Test', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  create_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  candleRange: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timeframe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false
});

module.exports = Test;
