const { expect } = require('chai')
const {User} = require('../server/db')
const jwt = require('jsonwebtoken')
const seed = require('../seed')
const SECRET = process.env.JWT;


describe('User model', () => {
  let users;
  beforeEach(async() => {
    users = (await seed());
  })

  describe('instance methods', () => {
    describe('generate token', () => {
      it('returns a token with the correct id', async() => {
        const dani = users[0]
        const token = await dani.generateToken()
        const { id } = await jwt.verify(token, SECRET)
        expect(id).to.equal(dani.id);
      })
    })

    describe('authenticate', () => {
      let user;
      beforeEach(async()=> user = await User.create({
        username: 'lucy',
        password: 'lucypw'
      }));

      describe('with correct credentials', () => {
        it('returns back a token', async () => {
          const token = await User.authenticate({
            username: 'lucy',
            password: 'lucypw'
          })
          expect(token).to.be.ok
        })
      })

      describe('with incorrect username or password', () => {
        it('throws a 401 error', async () => {
          try {
            await User.authenticate({
              username: 'larry',
              password: 'wrongpassword'
            });
            throw 'nooooo'
          } catch (error) {
            expect(error.status).to.equal(401)
          }
        })
      })
    })

    describe('password hashin', () => {
      it('hashes the password before creating the user', async () => {
        const jerry = User.create({
          username: 'Jerry',
          password: 'jerrypw'
        })

        expect(jerry.password).to.not.equal('jerrypw')
      })
    })
  })
})
