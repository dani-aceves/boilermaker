const app = require('./app')
const { db } = require('./db')

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
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
