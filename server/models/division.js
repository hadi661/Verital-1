// models/division.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
});

const divisionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  services: { type: [serviceSchema], default: [] },
  image: { type: String, required: true },
});

const Division = mongoose.model('Division', divisionSchema);

module.exports = Division;
