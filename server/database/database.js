const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize('ichimoco_robot', 'robot', 'Ichimoco@1402', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;