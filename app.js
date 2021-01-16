//include express and define server related variable
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const routes = require('./routes')
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const app = express()
const port = process.env.PORT

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error')
  next()
})
app.use(routes)


//Start and listen server
app.listen(port, (req, res) => {
  console.log('Server is running on http://localhost:3000')
})

