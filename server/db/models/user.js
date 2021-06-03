const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')
const SECRET = process.env.JWT;

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

//compares the plain text version of the password to the hased version saved in the database
User.prototype.correctPassword = function (userPwd) {
  return bcrypt.compare(userPwd, this.password);
}

//create a token for each user
User.prototype.generateToken = function () {
  return jwt.sign( {id: this.id }, SECRET )
}

User.authenticate = async ( {username, password} ) => {
  const user = await User.findOne({where: { username }})
  if(!user || !(await user.correctPassword(password))){
    const error = new Error('Incorrect username or password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
}

User.findByToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, SECRET);
    const user = await User.findByPk(id);
    if(!user){
      throw 'no user with this token'
    }
    return user;
  } catch (err) {
    const error = new Error('not a valid token');
    error.status = 401;
    throw error
  }
}

const hashPassword = async (user) => {
  if (user.changed('password')){
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
}

User.beforeCreate( async (user) => {
  await hashPassword(user);
})
module.exports = User;
