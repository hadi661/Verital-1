// search.js
const express = require('express');
const router = express.Router();
const Slide = require('../models/slide');
const Division = require('../models/division');
const TeamMember = require('../models/teams');
const Contact = require('../models/contact');
const Profil = require('../models/profil');
const About = require('../models/about');
const Service = require('../models/services');
const Testimonial = require('../models/testimonials');
const News = require('../models/news');
const connectDB = require('../config/db');

// Connect to the database
connectDB();

// Route for the search form submission
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.q || '';
        if (!searchTerm) {
            return res.render('search', { results: [], searchTerm, query: req.query });
        }

        const searchRegex = new RegExp(searchTerm, 'i');

        const slides = await Slide.find({ $or: [{ title: searchRegex }, { description: searchRegex }] }).lean();
        const divisions = await Division.find({ name: searchRegex }).lean();
        const teams = await TeamMember.find({ $or: [{ name: searchRegex }, { position: searchRegex }] }).lean();
        const contacts = await Contact.find({ $or: [{ name: searchRegex }, { email: searchRegex }] }).lean();
        const profiles = await ProfileCollection.find({ name: searchRegex }).lean();
        const abouts = await About.find({ content: searchRegex }).lean();
        const services = await Service.find({ $or: [{ name: searchRegex }, { description: searchRegex }] }).lean();
        const testimonials = await Testimonial.find({ text: searchRegex }).lean();
        const news = await News.find({ $or: [{ title: searchRegex }, { content: searchRegex }] }).lean();

        const results = [
            ...slides.map(item => ({ type: 'slide', data: item, context: 'Slide', url: '/' })),
            ...divisions.map(item => ({ type: 'division', data: item, context: 'Division', url: '/division/' + item.name })),
            ...teams.map(item => ({ type: 'team', data: item, context: 'Team', url: '/team' })),
            ...contacts.map(item => ({ type: 'contact', data: item, context: 'Contact', url: '/contact' })),
            ...profiles.map(item => ({ type: 'profile', data: item, context: 'Profile', url: '/profile' })),
            ...abouts.map(item => ({ type: 'about', data: item, context: 'About', url: '/about' })),
            ...services.map(item => ({ type: 'service', data: item, context: 'Service', url: '/service' })),
            ...testimonials.map(item => ({ type: 'testimonial', data: item, context: 'Testimonial', url: '/testimonial' })),
            ...news.map(item => ({ type: 'news', data: item, context: 'News', url: '/news' })),
        ];

        res.render('search', { results, searchTerm, query: req.query });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
