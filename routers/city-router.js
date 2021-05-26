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
    const city = req.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
    //get city by name
    const cityName = await cityModel.findOne({city: req.body.city});
    //if city does not exist, then connect to the API
    //and persist the new city in mongoDB
    //TODO: restringir a guardar solo cuando no existe
    try {
        if (!cityName) {
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
                    return res.status(201).send({
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
    } catch (error) {
        res.status(500).send(error);
    }
 })

 module.exports = app;