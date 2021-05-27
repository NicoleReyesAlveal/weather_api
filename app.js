const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const cityRouter = require('./routers/city-router.js');

const app = express()

require('dotenv').config()

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//sets X-Response-Time to Headers
app.use(responseTime());

//MongoDB conn string
const uri = 'mongodb://mongoadmin:pass@localhost:27888/?authSource=admin';

mongoose.connect(uri, {
                        useUnifiedTopology: true,
                        useNewUrlParser: true,
                        useFindAndModify: false},
                        (err, client) => {
    console.log('Connected to mongoDB');
})

app.use(cityRouter);

module.exports = app;