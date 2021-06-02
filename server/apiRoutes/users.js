const router = require('express').Router()
const { User } = require ('../db')


const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

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

router.post('/auth/login', async ( req, res, next) => {
  try {
    res.send({token: await User.authenticate(req.body)})
  } catch (error) {
    next(error)
  }
})

router.post('/auth/signup', async (req, res, next) => {
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

router.get('/auth/me', requireToken, async (req, res, next) => {
  try {
    if(req.user){
      res.send(req.user);
    } else{
      res.sendStatus(404);
    }
  } catch (error) {
    next(error)
  }
})
module.exports = router;
