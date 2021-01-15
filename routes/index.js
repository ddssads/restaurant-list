const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const user = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/sort', authenticator, sort)
router.use('/users', user)
router.use('/', authenticator, home)
module.exports = router