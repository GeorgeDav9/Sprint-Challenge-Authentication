// Imports

const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig');

// Tests start!

describe('Auth Router', () => {

  it('Runs the tests', () => {
    expect(true).toBe(true);
  })

  describe('test environment', function() {
      it('should use the testing environment', function() {
          expect(process.env.DB_ENV).toBe('testing')
      })
  })

  describe('POST to /api/auth/register', () => {
    beforeEach(async () => {
      await db('users').truncate();
    })

    it('Returns status code 201', () => {
      return request(server)
        .post('/api/auth/register')
        .send({ username: 'George', password: 'TheGoat' })
        .then(res => {
          expect(res.status).toBe(201);
        })
    })
  })

  describe('POST to /api/auth/register', () => {
    it('Returns length of one', async () => {
      const users = await db('users');

      await request(server)
        .post('/api/auth/register')
        .send({ username: 'George', password: 'TheGoat' })
        .then(res => {
          expect(users).toHaveLength(1)
        })
    })
  })

  describe('POST to /api/auth/login', () => {
    it('Returns a status code 200', () => {
      return request(server)
        .post('/api/auth/login')
        .send({ username: 'George', password: 'TheGoat' })
        .then(res => {
          expect(res.status).toBe(200);
        })
    })
  })

  describe('POST to /api/auth/login', () => {
    it('Returns an object', () => {
      return request(server)
        .post('/api/auth/login')
        .send({ username: 'George', password: 'TheGoat' })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        })
    })
  })
})