const express = require('express');
const path = require('path')
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(express.json())

app.use('/api', require('./apiRoutes'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error')
});

module.exports = app
