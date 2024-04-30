const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Test = require('./TestModel');

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tpPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: false
});

Test.hasMany(Result);
Result.belongsTo(Test);

module.exports = Result;
