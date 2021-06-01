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
module.exports = router;
