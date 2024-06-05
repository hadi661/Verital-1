// models/brands.js

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pictures: {
        type: [String],
        required: true
    }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
