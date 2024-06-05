// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const TeamMember = require('../models/teams');
const Division = require('../models/division');
const Contact = require('../models/contact');
const Profil = require('../models/profil');
const About = require('../models/about');
const Slide = require('../models/slide');
const Service = require('../models/services');

// Read all blog articles (overview)
router.get('/', async (req, res) => {
    try {
        const newsData = await Blog.find().sort({ date: -1 });

        // Fetch other data as needed (e.g., for sidebar or header)
        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contact1 = await Contact.find();
        const profilData = await Profil.findOne();
        const aboutData = await About.findOne();
        const slides = await Slide.find();
        const services = await Service.find();

        res.render('news', { 
            newsData, 
            services, 
            divisions 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Read a single blog article
router.get('/:id', async (req, res) => {
    try {
        const article = await Blog.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        // Fetch other data as needed (e.g., for sidebar or header)
        const newsData = await Blog.find().sort({ date: -1 });
        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contact1 = await Contact.find();
        const profilData = await Profil.findOne();
        const aboutData = await About.findOne();
        const slides = await Slide.find();
        const services = await Service.find();

        res.render('blog', { 
            article, 
            newsData,
            services, 
            divisions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
