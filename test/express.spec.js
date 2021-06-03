const seed = require('../seed')
const app = require('../server/app')
const request = require('supertest')
const { expect } = require('chai')

describe('user routes', () => {
  beforeEach(async () => {
    await seed()
  })

  describe('/api/users', () => {
    it('GET /api/users', async () => {
      const res = await request(app).get('/api/users').expect(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(3);
    })
  })

})
