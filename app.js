const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express()
const port = 3000

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('root endpoint')
})

app.post('/', (req, res) => {
    console.log(req.body);
    const city = req.body.city;
    const app_id = process.env.OPEN_WEATHER_API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + app_id + "&units=metric";
    https.get(url, (response) => {
        if( response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                res.send({
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
    })
 })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

