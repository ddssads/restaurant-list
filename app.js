//include express and define server related variable
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


//setting route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => req.params.id === restaurant.id.toString())
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const restaurant = restaurantList.results.filter((restaurant) => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
    restaurant.category.includes(req.query.keyword))
  res.render('index', { restaurants: restaurant })
})

//Start and listen server
app.listen(port, (req, res) => {
  console.log('Server is running on http://localhost:3000')
})

