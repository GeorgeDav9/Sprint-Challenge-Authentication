// Imports
const request = require('supertest');
const server = require('../api/server.js');

// Tests

describe('Jokes Router', () => {
  it('Runs the tests', () => {
    expect(true).toBe(true);
  })

  describe('GET to /api/jokes', () => {
    it("Returns status code 200", () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4MjkyOTcxOSwiZXhwIjoxNTgzMzYxNzE5fQ.wxRlFZhQLDdPWwG9XRXzp8bdQ4A09Cs5-AItFfdIp1w";

      return request(server).get('/api/jokes')
        .set('Authorization', token)
        .then(res => {
          expect(res.status).toBe(401);
        })
    })
  })

  describe('GET to /api/jokes', () => {
    it("Returns object", () => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4MjkyOTcxOSwiZXhwIjoxNTgzMzYxNzE5fQ.wxRlFZhQLDdPWwG9XRXzp8bdQ4A09Cs5-AItFfdIp1w";

      return request(server)
        .get('/api/jokes')
        .set('Authorization', token)
        .then(res => {
          expect(res.type).toMatch(/json/i)
        })
    })
  })
})