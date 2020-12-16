const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  //name/name_en/category/image/location/phone/google_map/rating(number)/description/
  restaurantList.results.forEach((restaurant) => Restaurant.create(restaurant))
  console.log('done')
})