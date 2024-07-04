const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for localized fields
const textSchema = new Schema({
    en: { type: String, required: true },
    fr: { type: String, required: true },
    ar: { type: String, required: true }
}, { _id: false });

// Define schema for testimonials
const TestimonialSchema = new Schema({
    text: { type: textSchema, required: true }
});

// Create model from schema
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = Testimonial;
