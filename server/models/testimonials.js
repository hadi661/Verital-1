const mongoose = require('mongoose');

// Define schema for testimonials
const TestimonialSchema = new mongoose.Schema({
    lang: { type: String, required: true },
    text: { type: String, required: true }
});

// Create model from schema
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = Testimonial;
