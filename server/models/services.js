const mongoose = require('mongoose');

// Schema for localized fields
const localizedStringSchema = new mongoose.Schema({
  en: { type: String, required: true },
  fr: { type: String, required: true },
  ar: { type: String, required: true }
}, { _id: false });

// Schema for individual service
const allServicesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String
}, { _id: false });

// Main services schema
const servicesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: { type: localizedStringSchema, required: true },
  services: { type: [allServicesSchema], default: [] },
  description: { type: localizedStringSchema, required: true },
  image: { type: [String], required: false },
  backgroundimages: { type: [String], required: true },
  icon: { type: [String], required: false },
  adddescription: { type: localizedStringSchema, required: true }
});

const Services = mongoose.model('Services', servicesSchema);
module.exports = Services;
