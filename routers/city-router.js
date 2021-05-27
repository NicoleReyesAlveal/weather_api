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

app.post('/', (req, res) => {
    const city = req.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
    const cityName = cityModel.find({city: city}).lean();
//    console.log(Object.keys(cityName));
//    console.log(cityName);
    if (Object.keys(cityName) === undefined){
        https.get(url, (response) => {
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
                    return res.status(201).send({
                            city: weatherData.name,
                            country: weatherData.sys.country,
                            temp: weatherData.main.temp,
                            temp_min: weatherData.main.temp_min,
                            temp_max: weatherData.main.temp_max
                    });
            });
        });
    } else {
//        console.log(req.body);
//        console.log(cityName.city + "NASD" + cityName.country);
        res.status(200).send(req.body);
    //{city: req.body.name,
    //            country: req.body.sys.country,
    //            temp: req.body.main.temp,
        //      temp_min: weatherData.main.temp_min,
        //      temp_max: weatherData.main.temp_max
    //    });
    }
    //TODO: restringir a guardar solo cuando no existe
 });

app.post('/from_api', (req, res) => {
// this route fetches the data from the api and saves it to mongodb
    const city = req.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                console.log("WEATHERDATA: " + weatherData);
                const city = new cityModel({
                                city: weatherData.name,
                                country: weatherData.sys.country,
                                temp: weatherData.main.temp,
                                temp_min: weatherData.main.temp_min,
                                temp_max: weatherData.main.temp_max
                });
                city.save();
                console.log('City saved to DB');
                return res.status(201).send({
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

 module.exports = app;