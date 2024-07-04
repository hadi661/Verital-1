// models/brand.js

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  pictures: [String] // Assuming pictures are stored as strings (paths)
});

module.exports = mongoose.model('Brand', brandSchema);
