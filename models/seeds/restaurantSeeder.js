const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const SEED_USER = [
  user1 = {
    email: 'user1@example.com',
    password: '12345678',
  },
  user2 = {
    email: 'user2@example.com',
    password: '12345678'
  }
]
db.once('open', () => {
  SEED_USER.forEach(user => {
    bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        email: user.email,
        password: hash
      }))
      .then(user => {
        console.log(user)
        const userId = user._id
        if (user.email === 'user1@example.com') {
          return Promise.all(Array.from(
            { length: 3 }, (_, i) => Restaurant.create({ ...restaurantList.results[i], userId })
          ))
        }
        return Promise.all(Array.from(
          { length: 3 }, (_, i) => Restaurant.create({ ...restaurantList.results[i + 2], userId })
        ))
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })
})