const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const cityRouter = require('./routers/city-router.js');

const app = express()
const port = 3000

require('dotenv').config()

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTime());

//MongoDB conn string
const uri = 'mongodb://mongoadmin:pass@localhost:27888/?authSource=admin';

mongoose.connect(uri, {
                        useUnifiedTopology: true,
                        useNewUrlParser: true,
                        useFindAndModify: false},
                        (err, client) => {
    console.log('Connected to mongoDB');
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`)
    })
})


app.use(cityRouter);