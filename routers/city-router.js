const express = require('express');
const https = require('https');
const cityModel = require('../models/city.js');

const app = express()

app.get('/temperature', (req, res) => {
// this route fetches the data from the api
    const city = req.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
//OpenWeather connection
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                console.log('Data from OpenWeatherMap');
                console.log('For more information see https://openweathermap.org/api');
//Send city temperature
                return res.status(200).send({
                            city: weatherData.name,
                            country: weatherData.sys.country,
                            temp: weatherData.main.temp,
                            temp_min: weatherData.main.temp_min,
                            temp_max: weatherData.main.temp_max
                });
            })
        } else {
            res.status(404).send('City not found')
            console.log('City not found');

        }
    });
 });

app.post('/temperature', (req, res) => {
// this route fetches the data from the api and saves it to mongodb
    const city = req.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                const city = new cityModel({
                                city: weatherData.name,
                                country: weatherData.sys.country,
                                temp: weatherData.main.temp,
                                temp_min: weatherData.main.temp_min,
                                temp_max: weatherData.main.temp_max
                });
                city.save();
                console.log('City saved to DB');
                return res.status(201).json({
                            city: weatherData.name,
                            country: weatherData.sys.country,
                            temp: weatherData.main.temp,
                            temp_min: weatherData.main.temp_min,
                            temp_max: weatherData.main.temp_max
                });
            })
        } else {
            res.status(404).send('City not found')
        }
    });
 });

app.get('/test', async (req, res) => {
//Test endpoint to try '../tests/city.test.js'
  res.json({message: 'Test'})
})

 module.exports = app;