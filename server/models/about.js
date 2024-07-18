const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    en: String,
    fr: String,
    ar: String
  },
  content: {
    en: String,
    fr: String,
    ar: String
  },
  text: {
    en: String,
    fr: String,
    ar: String
  },
  additionalContent: {
    en: [String],
    fr: [String],
    ar: [String]
  },
  images: [String],
  videos: [String]
});

module.exports = mongoose.model('About', aboutSchema);
