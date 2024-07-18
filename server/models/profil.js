const mongoose = require('mongoose');
const { Schema } = mongoose;

const  MultilingualContentSchema= new Schema({
  en: { type: String, required: true },
  fr: { type: String, required: true },
  ar: { type: String, required: true },
}, { _id: false });
 
const QuoteSchema = new Schema({
  en: { type: String, required: false },
  fr: { type: String, required: false },
  ar: { type: String, required: false },
}, { _id: false });

const CEOSchema = new Schema({
  title: { type: MultilingualContentSchema, required: true },
  content: { type: MultilingualContentSchema, required: true },
  quotes: { type: [QuoteSchema], required: false },
  text: { type: MultilingualContentSchema, required: true },
  additionalContent: { type: MultilingualContentSchema, default: null },
  images: { type: [String], required: false },
  videos: { type: [String], required: false },
});

const ProfileCollectionSchema = new Schema({
  CEO: { type: CEOSchema, required: true },
});

const ProfileCollection = mongoose.model('Profile', ProfileCollectionSchema);

module.exports = ProfileCollection;
