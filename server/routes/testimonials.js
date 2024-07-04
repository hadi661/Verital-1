const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonials');
const Division = require('../models/division');
const Service = require('../models/services');
const Slide = require('../models/slide');
const About = require('../models/about');
const TeamMember = require('../models/teams');
const Contact = require('../models/contact');
const ProfileCollection = require('../models/profil');


// Route to get all testimonials and other data for the homepage
router.get('/', async (req, res) => {
    try {
        const locale = req.query.locale || 'fr';

        const testimonials = await Testimonial.find();
        const divisions = await Division.find(); 
        const allServices = await Service.find(); 
        const slides = await Slide.find();
        const aboutData = await About.findOne();
        const topTeamMembers = await TeamMember.find().sort({ position: 1 }).limit(4);
        const contact1 = await Contact.find();
        const profileData = await ProfileCollection.findOne();
        const teams = await TeamMember.find();

        const localizedTestimonials = testimonials.map(testimonial => ({
            _id: testimonial._id,
            text: testimonial.text[locale] || testimonial.text['fr'] // Fallback to 'fr' if locale text is not available
        }));

        res.render('index', { 
            testimonials: localizedTestimonials,
            locale,
            divisions,
            services: allServices,
            slides,
            topTeamMembers,
            aboutData,
            contact1,
            profileData,
            currentRoute: '/'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

// Route to create a new testimonial
router.post('/', async (req, res) => {
    try {
        const newTestimonial = new Testimonial(req.body);
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a testimonial by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTestimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.json(updatedTestimonial);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to delete a testimonial by ID
router.delete('/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
