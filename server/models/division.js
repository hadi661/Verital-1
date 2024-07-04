const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define the schema for localized fields
const LocalizedSchema = new Schema({
  en: { type: String, required: true },
  fr: { type: String, required: true },
  ar: { type: String, required: true },
}, { _id: false });

const discriptionServiceSchema = new Schema({
  en: { type: String, required: true },
  fr: { type: String, required: true },
  ar: { type: String, required: true },
}, { _id: false });

// Define the service schema
const serviceSchema = new Schema({
  name: { type: LocalizedSchema, required: true },
  description: { type: discriptionServiceSchema, required: true },
  image: { type: String, required: false },
});

// Define the division schema
const divisionSchema = new Schema({
  name: { type: String, required: true },
  title: { type: LocalizedSchema, required: true },
  description: { type: discriptionServiceSchema, required: true },
  services: { type: [serviceSchema], default: [] },
  image: { type: [String], required: false },
  icon: { type: [String], required: false },
  background_images: { type: [String], default: [] }
});

// Create the Division model
const Division = mongoose.model('Division', divisionSchema);
module.exports = Division;
