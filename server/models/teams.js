// models/teams.js
const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
    facebook: String,
    twitter: String,
    instagram: String,
});

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true, index: true },
    image: { type: String, required: true },
    socialMedia: SocialMediaSchema,
});

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);

module.exports = TeamMember;
