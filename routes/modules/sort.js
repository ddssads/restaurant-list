const express = require('express')
const router = express.Router()
const checkSort = require('../../checksort')
const Restaurant = require('../../models/restaurant')

//Sort
router.get('/:type/:method', (req, res) => {
  const type = req.params.type
  const method = req.params.method
  const { selected, showSelected } = checkSort(type, method)
  Restaurant.find()
    .lean()
    .sort(selected)
    .then(restaurants => res.render('index', { restaurants, showSelected }))
    .catch(error => console.log(error))
})


module.exports = router