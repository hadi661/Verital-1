const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        fr: { type: String, required: false },
        ar: { type: String, required: false },
    },
    category: {
        en: { type: String, required: true },
        fr: { type: String, required: false },
        ar: { type: String, required: false },
    },
    content: {
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
    }
});

module.exports = mongoose.model('News', NewsSchema);
