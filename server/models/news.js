const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const CommentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reactions: {
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 }
    },
    replies: [ReplySchema]
});

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
    },
    comments: [CommentSchema],
    reactions: {
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 }
    },
    videos: [{ type: String }]
});

NewsSchema.virtual('shortContent').get(function() {
    const content = this.content.en || '';
    return content.substring(0, 250) + '...';
});

module.exports = mongoose.model('News', NewsSchema);
