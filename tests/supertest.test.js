const request = require('supertest')
const cheerio = require('cheerio')

const server = require('../server')

// const router = require('./routes')

test('test Get /', (done) => {
  request(server)
    .get('/')
    .expect(200)
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.text).toMatch('Pear')
      done()
    })
})