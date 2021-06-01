const db = require('./db')
const User = require('./models/user')
const Restaurant = require('./models/restaurant')

Restaurant.belongsToMany(User, {through: 'user_restaurant'})
User.belongsToMany(Restaurant, {through: 'user_restaurant'})

module.exports = {
  db,
  User,
  Restaurant
}
