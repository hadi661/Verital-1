const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const Blog = require('../models/Blog');
const Services = require('../models/services');
const Testimonial = require('../models/testimonials');
const Contact = require('../models/contact');
const Division = require('../models/division');
const TeamMember = require('../models/teams');
const About = require('../models/about');
const Profil = require('../models/profil');
const Slide = require('../models/slide');
const User = require('../models/User');
const bcrypt = require('bcrypt');
//  middleware to all routes in this router
router.use(isAuthenticated);
router.use(isAdmin);
// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }

        // Set user session
        req.session.userId = user._id;
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Server Error');
        }
        res.redirect('/login');
    });
});
// Dashboard home
router.get('/', async (req, res) => {
    try {
        const blogCount = await Blog.countDocuments();
        const serviceCount = await Services.countDocuments();
        const testimonialCount = await Testimonial.countDocuments();
        const contactCount = await Contact.countDocuments();
        const divisionCount = await Division.countDocuments();
        const teamMemberCount = await TeamMember.countDocuments();
        const slideCount = await Slide.countDocuments();

        res.render('admin/dashboard', { blogCount, serviceCount, testimonialCount, contactCount, divisionCount, teamMemberCount, slideCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing Blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.render('admin/blogs', { blogs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/blogs', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.redirect('/admin/blogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/blogs/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/blogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/blogs/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/admin/blogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing Services
router.get('/services', async (req, res) => {
    try {
        const services = await Services.find();
        res.render('admin/services', { services });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/services', async (req, res) => {
    try {
        const newService = new Services(req.body);
        await newService.save();
        res.redirect('/admin/services');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/services/:id', async (req, res) => {
    try {
        const updatedService = await Services.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/services');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/services/:id', async (req, res) => {
    try {
        await Services.findByIdAndDelete(req.params.id);
        res.redirect('/admin/services');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing Testimonials
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.render('admin/testimonials', { testimonials });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/testimonials', async (req, res) => {
    try {
        const newTestimonial = new Testimonial(req.body);
        await newTestimonial.save();
        res.redirect('/admin/testimonials');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/testimonials/:id', async (req, res) => {
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/testimonials');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/testimonials/:id', async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.redirect('/admin/testimonials');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing Contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render('admin/contacts', { contacts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.redirect('/admin/contacts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/contacts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect('/admin/contacts');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing Divisions
router.get('/divisions', async (req, res) => {
    try {
        const divisions = await Division.find();
        res.render('admin/divisions', { divisions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/divisions', async (req, res) => {
    try {
        const newDivision = new Division(req.body);
        await newDivision.save();
        res.redirect('/admin/divisions');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/divisions/:id', async (req, res) => {
    try {
        const updatedDivision = await Division.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/divisions');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/divisions/:id', async (req, res) => {
    try {
        await Division.findByIdAndDelete(req.params.id);
        res.redirect('/admin/divisions');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing Team Members
router.get('/team-members', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.render('admin/team-members', { teamMembers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/team-members', async (req, res) => {
    try {
        const newTeamMember = new TeamMember(req.body);
        await newTeamMember.save();
        res.redirect('/admin/team-members');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/team-members/:id', async (req, res) => {
    try {
        const updatedTeamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/team-members');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/team-members/:id', async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.redirect('/admin/team-members');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing About
router.get('/about', async (req, res) => {
    try {
        const about = await About.findOne();
        res.render('admin/about', { about });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/about', async (req, res) => {
    try {
        const newAbout = new About(req.body);
        await newAbout.save();
        res.redirect('/admin/about');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/about/:id', async (req, res) => {
    try {
        const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/about');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/about/:id', async (req, res) => {
    try {
        await About.findByIdAndDelete(req.params.id);
        res.redirect('/admin/about');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Routes for managing Profile
router.get('/profile', async (req, res) => {
    try {
        const profile = await Profil.findOne();
        res.render('admin/profile', { profile });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/profile', async (req, res) => {
    try {
        const newProfile = new Profil(req.body);
        await newProfile.save();
        res.redirect('/admin/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.put('/profile/:id', async (req, res) => {
    try {
        const updatedProfile = await Profil.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.delete('/profile/:id', async (req, res) => {
    try {
        await Profil.findByIdAndDelete(req.params.id);
        res.redirect('/admin/profile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/slides', async (req, res) => {
    try {
        const slides = await Slide.find();
        res.render('admin/slides', { slides });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/slides', async (req, res) => {
    try {
        const newSlide = new Slide(req.body);
        await newSlide.save();
        res.redirect('/admin/slides');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.put('/slides/:id', async (req, res) => {
    try {
        const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/admin/slides');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/slides/:id', async (req, res) => {
    try {
        await Slide.findByIdAndDelete(req.params.id);
        res.redirect('/admin/slides');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
