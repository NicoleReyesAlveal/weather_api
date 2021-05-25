const { Schema, model } = require('mongoose');

const citySchema = new Schema({
    city: String,
    country: String,
    temp: Number,
    temp_min: Number,
    temp_max: Number
})

const City = model('City', citySchema);
module.exports = City;