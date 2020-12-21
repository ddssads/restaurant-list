//include express and define server related variable
const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const restaurant = require('./models/restaurant')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


//setting route
//Show index page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
//create restaurant
app.get('/restaurants/create', (req, res) => {
  return res.render('create')
})

app.post('/restaurants', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Show restaurant detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const newRestaurant = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, newRestaurant)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//delete 
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//Search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantsFiltered = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword))
      res.render('index', { restaurants: restaurantsFiltered })
    })
    .catch(error => console.log(error))
})

//Sort
app.get('/:type/:method', (req, res) => {
  console.log(req.params.type)
  const method = req.params.method
  let selected = {}
  let showSelected = ''
  if (req.params.type === 'name') {
    selected.name = method
    showSelected = '按名稱排序'
  }
  if (req.params.type === 'category') {
    selected.category = method
    showSelected = '按分類排序'
  }
  if (req.params.type === 'rating') {
    selected.rating = method
    method === 'asc' ? showSelected = '按評分排序↑' : showSelected = '按評分排序↓'
  }
  console.log(selected)
  Restaurant.find()
    .lean()
    .sort(selected)
    .then(restaurants => res.render('index', { restaurants, showSelected }))
    .catch(error => console.log(error))

})



//Start and listen server
app.listen(port, (req, res) => {
  console.log('Server is running on http://localhost:3000')
})

