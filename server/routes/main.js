//routes/main.js
const express = require('express');
const router = express.Router();
const ProfileCollection = require('../models/profil');
const Division = require('../models/division');
const TeamMember = require('../models/teams');
const Contact = require('../models/contact');
const About = require('../models/about');
const Service = require('../models/services');
const Slide = require('../models/slide');
const Testimonial = require('../models/testimonials');
const News = require('../models/news');
const connectDB = require('../config/db');
const Services = require('../models/services');
// Connect to the database
connectDB();
router.get('/', async (req, res) => {
    try {
        const lang = req.query.lang || 'fr';
        const locals = {
            title: "Verital Spa",
            description: "siège veritas alger direction general DG",
        };

        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contact1 = await Contact.find();
        const profileData = await ProfileCollection.findOne();
        const aboutData = await About.findOne();
        const slides = await Slide.find();
        const allServices = await Services.find();
         const topTeamMembers = await TeamMember.find().sort({ position: 1 }).limit(4);
        
        if (!profileData) {
            return res.status(404).send('Profile data not found');
        }
        console.log('All Services:', allServices);
        res.render('index', { locals, teams, services: allServices, topTeamMembers, divisions, contact1, profileData, aboutData, slides, currentRoute: '/', lang});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to create a new team member
router.post('/team', async (req, res) => {
    try {
        const newTeamMember = new TeamMember(req.body);
        await newTeamMember.save();
        res.status(201).send(newTeamMember);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a team member
router.put('/team/:id', async (req, res) => {
    try {
        const updatedTeamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }
        res.json(updatedTeamMember);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to delete a team member
router.delete('/team/:id', async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.redirect('/team');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
// Route to render all divisions links in view
router.get('/division', async (req, res) => {
    try {
        const divisions = await Division.find();
        res.render('d', { divisions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/division', async (req, res) => {
    try {
        console.log('Incoming POST data:', req.body);
        const newDivision = new Division(req.body);
        await newDivision.save();
        res.redirect(`/division/${req.body.name}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a division
router.put('/division/:id', async (req, res) => {
    try {
        await Division.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/division/${req.body.name}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to delete a division
router.delete('/division/:id', async (req, res) => {
    try {
        await Division.findByIdAndDelete(req.params.id);
        res.redirect('/division');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to fetch and render a single division by name
router.get('/division/:divisionName', async (req, res) => {
    try {
        const locals = {
            title: "Verital Spa",
            description: "siège veritas alger direction general DG",
        };
        const divisionName = req.params.divisionName;
        const division = await Division.findOne({ name: divisionName });
        const divisions = await Division.find();
        const teams = await TeamMember.find();
        const services = await Service.find(); 
        const contact1 = await Contact.find();
        const profilData = await ProfileCollection.findOne();
        const aboutData = await About.findOne();
        const slides = await Slide.find();

        console.log('Fetched Division:', division);

        if (division) {
            res.render('division', { division, services, divisions });
        } else {
            res.status(404).send('Division not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to fetch all team members and top 4 team members by position
router.get('/team', async (req, res) => {
    try {
        const locals = {
            title: "Verital Spa",
            description: "siège veritas alger direction general DG",
        };
        const divisions = await Division.find();
        const allTeamMembers = await TeamMember.find();
        const topTeamMembers = await TeamMember.find().sort({ position: 1 }).limit(4);
        const teams = await TeamMember.find();
        const contact1 = await Contact.find();
        const profilData = await ProfileCollection.findOne();
        const aboutData = await About.findOne();
        const services = await Service.find(); 

        res.render('team', {  allTeamMembers, services, topTeamMembers, locals, teams, divisions, contact1, profilData, aboutData, currentRoute: '/team' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to create a new contact
router.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).send(newContact);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a contact
router.put('/contact/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json(updatedContact);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to delete a contact
router.delete('/contact/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to read all contacts
router.get('/contact', async (req, res) => {
    try {
        const locals = {
            title: "Verital Spa",
            description: "siège veritas alger direction general DG",
        };
        const contact1 = await Contact.find();
        const divisionName = req.params.divisionName;
        const division = await Division.findOne({ name: divisionName });
        const divisions = await Division.find();
        const teams = await TeamMember.find();
        const profilData = await ProfileCollection.findOne();
        const aboutData = await About.findOne();
        const services = await Service.find(); 
        
        console.log('Fetched contacts:', contact1);
        res.render('contact', { locals, teams, services, divisions, contact1, profilData, aboutData, currentRoute: 'contact' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
router.get('/profile', async (req, res) => {
    try {
        const locals = {
            title: "Verital Spa",
            description: "siège veritas alger direction general DG",
        };

        const divisions = await Division.find();
        const profileData = await ProfileCollection.findOne();
        const teams = await TeamMember.find();
        const contact1 = await Contact.find();
        const services = await Service.find();
        const aboutData = await About.findOne();

        if (!profileData) {
            return res.status(404).send('Profile data not found');
        }

        const localizedProfileData = {
            CEO: {
                title: profileData.CEO.title[req.lang] || '',
                content: profileData.CEO.content[req.lang] || '',
                quotes: profileData.CEO.quotes.map(quote => quote[req.lang] || '') || [],
                images: profileData.CEO.images || [],
                videos: profileData.CEO.videos || [],
                text: profileData.CEO.text[req.lang] || 'Text not available for the selected language.',
            }
        };

        res.render('profile', { locals, profileData: localizedProfileData, aboutData, teams, services, divisions, contact1, currentRoute: '/', lang: req.lang });
    } catch (err) {
        console.error('Error fetching profile data:', err);
        res.status(500).send('Server Error');
    }
});


router.post('/profile', async (req, res) => {
    try {
        const newProfile = new ProfileCollection(req.body);
        const profile = await newProfile.save();
        res.status(201).json(profile);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

router.put('/profile/:id', async (req, res) => {
    try {
        const profile = await ProfileCollection.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const updatedProfile = await ProfileCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/profile/:id', async (req, res) => {
    try {
        const profile = await ProfileCollection.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        await ProfileCollection.findByIdAndDelete(req.params.id);
        res.json({ message: 'Profile deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to fetch and render about data
router.get('/about', async (req, res) => {
    try {
        const locals = {
            title: "Verital Spa",
            description: "siège veritas alger direction general DG",
        };
        const lang = res.locals.lang;
        const aboutData = await About.findOne({}, {
            [`title.${lang}`]: 1,
            [`content.${lang}`]: 1,
            [`text.${lang}`]: 1,
            [`additionalContent.${lang}`]: 1,
            images: 1,
            videos: 1
        });
        const teams = await TeamMember.find();
        const divisions = await Division.find();
        const contact1 = await Contact.find();
        const profileData = await ProfileCollection.findOne();
        const services = await Service.find();

        if (!aboutData) {
            return res.status(404).send('About data not found');
        }

        res.render('about', {
            locals,
            aboutData,
            teams,
            services,
            divisions,
            contact1,
            profileData,
            currentRoute: 'about'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to create new about data
router.post('/about', async (req, res) => {
    const aboutData = new About(req.body);
    try {
        await aboutData.save();
        res.status(201).send(aboutData);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

// Route to update about data
router.put('/about/:id', async (req, res) => {
    try {
        const aboutData = await About.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!aboutData) {
            return res.status(404).send();
        }
        res.send(aboutData);
    } catch (err) {
        console.error(err);
        res.status(400).send(err);
    }
});

// Route to delete about data
router.delete('/about/:id', async (req, res) => {
    try {
        const aboutData = await About.findByIdAndDelete(req.params.id);
        if (!aboutData) {
            return res.status(404).send();
        }
        res.send(aboutData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});
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
// Route to create a new service
router.post('/service', async (req, res) => {
    try {
        console.log('Incoming POST data:', req.body);
        const newService = new Services(req.body);
        await newService.save();
        res.redirect('/services');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a service
router.put('/service/:id', async (req, res) => {
    try {
        await Services.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/services');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to delete a service
router.delete('/service/:id', async (req, res) => {
    try {
        await Services.findByIdAndDelete(req.params.id);
        res.redirect('/services');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to render the services page
router.get('/services', async (req, res) => {
    try {
        const allServices = await Services.find(); // Fetch all services
        const divisions = await Division.find();

        res.render('services', { services: allServices, divisions: divisions, currentRoute: '/'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to get a specific service by name
router.get('/services/:serviceName', async (req, res) => {
    try {
        const serviceName = req.params.serviceName;
        const service = await Services.findOne({ name: serviceName });
        const allServices = await Services.find(); // Fetch all services
        const divisions = await Division.find();

        if (service) {
            res.render('service', { service: service, allServices: allServices, divisions: divisions });
        } else {
            res.status(404).send('Service not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
