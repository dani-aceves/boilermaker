const Sequelize = require('sequelize')
const db = require('../db')

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.0,
      max: 5.0
    }
  }
})

module.exports = Restaurant;
