const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/create', (req, res) => {
  return res.render('create')
})

router.post('/', (req, res) => {
  const restaurantObj = req.body
  restaurantObj['userId'] = req.user._id
  console.log(restaurantObj)
  if (!req.body.image) {
    req.body.image = 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/6227/restaurant-list-logo.png'
  }
  return Restaurant.create(restaurantObj)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Show restaurant detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categorys = [
    { name: '美式' },
    { name: '中東料理' },
    { name: '日本料理' },
    { name: '義式餐廳' },
    { name: '酒吧' },
    { name: ' 咖啡' }
  ]
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      showCategory = categorys.filter(category => category.name !== restaurant.category)
      res.render('edit', { restaurant, showCategory })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newRestaurant = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, newRestaurant)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

//delete 
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router