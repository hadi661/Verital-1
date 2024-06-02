const mongoose = require('mongoose');

// Define the schema for localized fields
const LocalizedSchema = new mongoose.Schema({
  en: { type: String, required: true },
  fr: { type: String, required: true },
  ar: { type: String, required: true },
}, { _id: false });

// Define the service schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: [String], required: false },
});

// Define the division schema
const divisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  services: { type: [serviceSchema], default: [] },
  image: { type: [String], required: false },
  icon: { type: [String], required: false },
  background_images: { type: [String], default: [] }
});

// Create the Division model
const Division = mongoose.model('Division', divisionSchema);
module.exports = Division;
