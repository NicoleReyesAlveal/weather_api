const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const cityRouter = require('./routers/city-router.js');

const app = express()
const port = 3000

require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(cityRouter);