const mongoose = require('mongoose');

const allServicesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String
});

const servicesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  title: {
    en: { type: String, required: true },
    fr: { type: String, required: true },
    ar: { type: String, required: true }
  },
  services: { type: [allServicesSchema], default: [] },
  description: {
    type: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
      ar: { type: String, required: true }
    },
    required: true
  },
  image: { type: [String], required: false },
  backgroundimages: { type: [String], required: true },
  icon: { type: [String], required: false }
});

const Services = mongoose.model('Services', servicesSchema);
module.exports = Services;
