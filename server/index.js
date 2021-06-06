const app = require('./app')
const { db } = require('./db')
const seed = require('../seed')
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;


const init = async () => {
  try {
    if(process.env.SEED === 'true'){
      await seed();
    }
    else {
      await db.sync()
    }
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

    const io = socketIO(server);
    io.on('connection', (socket) => {
      console.log('Client connected');
      socket.on('disconnect', () => console.log('Client disconnected'));
    });
  } catch (ex) {
    console.log(ex)
  }
}






init()
