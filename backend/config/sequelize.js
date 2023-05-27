require('dotenv').config();
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
const sequelize = new Sequelize(config); // Pass the entire config object

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
module.exports = sequelize;
