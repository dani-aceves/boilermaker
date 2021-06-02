const router = require('express').Router()
const { User } = require ('../db')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async ( req, res, next) => {
  try {
    res.send({token: await User.authenticate(req.body)})
  } catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError'){
      res.status(401).send('User already exists')
    } else{
      next(error)
    }
  }
})
module.exports = router;
