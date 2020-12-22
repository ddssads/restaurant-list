const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

//Search
router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantsFiltered = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword))
      res.render('index', { restaurants: restaurantsFiltered })
    })
    .catch(error => console.log(error))
})

module.exports = router