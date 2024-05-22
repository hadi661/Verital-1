const mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
    CEO: {
        title: { type: String, required: true },
        content: { type: String, required: true },
        images: [String],
        videos: [String]
    },
    about: {
        title: { type: String, required: true },
        content: { type: String, required: true },
        images: [String],
        videos: [String]
    }
});

module.exports = mongoose.model('Profil', profilSchema);
