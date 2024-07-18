// models/slide.js
const mongoose = require('mongoose');

const SlideSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Slide', SlideSchema);
