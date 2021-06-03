const { green, red } = require('chalk')
const { User, Restaurant, db } = require('./server/db/index')

const users = [
  {username: 'Dani', password: 'danipw'},
  {username: 'Ale', password: 'alepw'},
  {username: 'Nicole', password: 'nicolepw'},
]

const restaurants = [
  {
    name: 'Yummy Bowl',
    address: '200 Park Ave',
    rating: 4.2
  },
  {
    name: 'Taco Bout It',
    address: '333 Madison Ave',
    rating: 3.8
  },
  {
    name: 'Sushi Mania',
    address: '109 Lexington Ave',
    rating: 4.9
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    //console.log('db synced!')

    const [dani, ale, nicole] = await Promise.all(users.map(user => {
      return User.create(user);
    }))

    const [bowl, taco, sushi] = await Promise.all(restaurants.map(restaurant => {
      return Restaurant.create(restaurant);
    }))

    await bowl.addUser(dani)
    await bowl.addUser(ale)
    await taco.addUser(ale)
    await taco.addUser(nicole)
    await sushi.addUser(nicole)
    await sushi.addUser(dani)
   // console.log(`seeded ${users.length} users`)
    //console.log(`seeded successfully`)

    return [dani,ale,nicole,bowl,taco,sushi]
  } catch (error) {
    console.log(red(error));
  }
}

async function runSeed() {
  //console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    //console.error(err)
    process.exitCode = 1
  } finally {
    //console.log('closing db connection')
    await db.close()
    //console.log('db connection closed')
  }
}


if (require.main === module) {
  runSeed()
}

module.exports = seed;
