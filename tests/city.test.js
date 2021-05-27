const app = require('../app.js');
const supertest = require('supertest');
const mongoose = require('mongoose');

const request = supertest(app);
jest.setTimeout(30000);

beforeEach((done) => {
  mongoose.connect("mongodb://mongoadmin:pass@localhost:27888/?authSource=admin",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

it('get test endpoint', async () => {
    const res = await request.get('/test');

    await expect(res.status).toBe(200);
    await expect(res.body.message).toBe('pass!');

});