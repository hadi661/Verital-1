// models/services.js
const mongoose = require('mongoose');

// Define schema for services
const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

// Create model from schema
const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
