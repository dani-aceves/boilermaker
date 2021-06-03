const seed = require('../seed')
const app = require('../server/app')
const request = require('supertest')
const { expect } = require('chai')
const jwt = require('jsonwebtoken')

describe('User Routes', () => {
  let users;
  beforeEach(async() => {
    users = (await seed());
  })

  describe('/api/users', () => {
    it('GET /api/users', async () => {
      const res = await request(app).get('/api/users').expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);

    })
  })

  describe('login and signup', () => {
    it('/api/users/auth/login', async () => {
      const username = 'Dani'
      const password = 'danipw'
      const res = await request(app).post('/api/users/auth/login').send({username: username, password: password}).expect(200);
    })

    it('/api/users/auth/login', async () => {
      const username = 'Lucy'
      const password = 'lucypw'
      const res = await request(app).post('/api/users/auth/signup').send({username: username, password: password}).expect(200);
    })
  })

  describe('get single user info', () => {
    it('api/users/auth/me', async () => {
      const token = await users[0].generateToken();
    })
  })
})
