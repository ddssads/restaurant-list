const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  //name/name_en/category/image/location/phone/google_map/rating(number)/description/
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String
})

module.exports = mongoose.model('Restaurant', restaurantSchema)