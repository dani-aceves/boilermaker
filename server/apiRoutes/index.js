const router = require('express').Router()
//this is where the "table of contents" will live in order for the router to reference only this file and not each individual file

router.use('/users', require('./users'))

//error handling middleware
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})


module.exports = router
