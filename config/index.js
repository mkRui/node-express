const Sequelize = require('sequelize');

module.exports = new Sequelize('blog_control', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})