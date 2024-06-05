// models/blogModel.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    fr: { type: String, required: false },
    ar: { type: String, required: false },
  },
  content: {
    en: { type: String, required: true },
    fr: { type: String, required: false },
    ar: { type: String, required: false },
  },
  category: {
    en: { type: String, required: true },
    fr: { type: String, required: false },
    ar: { type: String, required: false },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  pictures: {
    type: String,
    required: false,
  },
  comments: [
    {
      author: { type: String, required: true },
      content: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  reactions: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model('Blog', BlogSchema, 'news');
