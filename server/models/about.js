// models/about.js
const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    title: String,
    content: String,
    quotes: [String],
    text: String,
    additionalContent: [String],
    images: [String],
    videos: [String]
});

const About = mongoose.model('About', aboutSchema);

module.exports = About;
