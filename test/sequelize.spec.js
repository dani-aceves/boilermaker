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
  })
})
