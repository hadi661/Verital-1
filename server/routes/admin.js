// routes/admin.js
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const ensureAuthenticated = require('../middleware/auth');
const Slide = require('../models/slide');
const Profil = require('../models/profil');
const About = require('../models/about');
const TeamMember = require('../models/teams');
const Division = require('../models/division');
const Contact = require('../models/contact');

router.use(methodOverride('_method'));

// Admin Dashboard
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const slides = await Slide.find();
        const profilData = await Profil.find();
        const aboutData = await About.find();
        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contacts = await Contact.find();
        res.render('admin/dashboard', { slides, profilData, aboutData, teams, divisions, contacts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// CRUD operations 
router.get('/slides', ensureAuthenticated, async (req, res) => {
    try {
        const slides = await Slide.find();
        res.render('admin/slides', { slides });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/slides', ensureAuthenticated, async (req, res) => {
    try {
        const newSlide = new Slide(req.body);
        await newSlide.save();
        res.redirect('/admin/slides');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/slides/:id', ensureAuthenticated, async (req, res) => {
    try {
        await Slide.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin/slides');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/slides/:id', ensureAuthenticated, async (req, res) => {
    try {
        await Slide.findByIdAndDelete(req.params.id);
        res.redirect('/admin/slides');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Similar CRUD operations for profile, about, team, division, contact...

module.exports = router;