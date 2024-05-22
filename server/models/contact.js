const mongoose = require('mongoose');

// Define schema for contact
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: [String], required: true },
    email: { type: String, required: true },
    website: { type: String, default: null },
    fax: { type: [Number], default: null }
});

// Create model from schema
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
