const app = require('./app')
const { db } = require('./db')
const seed = require('../seed')
const { Server } = require('ws');

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

    const wss = new Server({ server });

    wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
  });


  } catch (ex) {
    console.log(ex)
  }
}






init()
