const app = require('../app.js');
const supertest = require('supertest');
const mongoose = require('mongoose');

const request = supertest(app);
jest.setTimeout(30000);

//Replicate MongoDB connection before and after each test
beforeEach((done) => {
  mongoose.connect("mongodb://mongoadmin:pass@localhost:27888/?authSource=admin",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

//And deleting the database
afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

test('get test endpoint', async () => {
    const res = await request.get('/test');

     expect(res.status).toBe(200);
     expect(res.body.message).toBe('Test');
});

test('get temperature from api', async () => {
    const res = await request.get('/temperature');
    const city = res.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
    expect(res.status).toBe(200);
});