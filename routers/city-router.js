const express = require('express');
const https = require('https');
const cityModel = require('../models/city.js');

const app = express()

app.get('/', (req, res) => {
  res.send('root endpoint')
})

app.post('/city', async (req, res) => {
    const city = new cityModel(req.body);
    try {
        await city.save();
        res.status(201).send(city);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/', async (req, res) => {
    console.log(req.body.city);
    const city = req.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
    const cityName = await cityModel.findOne({city: req.body.city}).exec();
    console.log('const cityName: ' + cityName + ' ----');
    if (cityName === null) {
          https.get(url, (response) => {
          response.on("data", (data) => {
          const weatherData = JSON.parse(data);
          const city = new cityModel({
                        city: weatherData.name,
                        country: weatherData.sys.country,
                        temp: weatherData.main.temp,
                        temp_min: weatherData.main.temp_min,
                        temp_max: weatherData.main.temp_max
                        })
          city.save();
          console.log('City saved to DB')
          res.send({
                    city: weatherData.name,
                    country: weatherData.sys.country,
                    temp: weatherData.main.temp,
                    temp_min: weatherData.main.temp_min,
                    temp_max: weatherData.main.temp_max
          });
          })
       })
    } else {
        res.status(200).send(cityName);
    }
 })

 module.exports = app;