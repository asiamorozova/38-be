require('dotenv').config();

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');

describe('38-be routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('creates a castle', () => {
    return request(app)
      .post('/api/v1/castles')
      .send({
        name: 'castle name',
        year: 1969,
        image: 'URL',
        description: 'spooky castle'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'castle name',
          year: 1969,
          image: 'URL',
          description: 'spooky castle',
          __v: 0
        });
      });
  });

});



