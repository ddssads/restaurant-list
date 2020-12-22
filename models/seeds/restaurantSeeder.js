const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantList.results.forEach((restaurant) => Restaurant.create(restaurant))
  console.log('done')
})