const express = require('express');
const router = express.Router();
const Division = require('../models/division');
const TeamMember = require('../models/teams'); // Corrected import name
const Contact = require('../models/contact');
const Profil = require('../models/profil');
const connectDB = require('../config/db');

// Connect to the database
connectDB();

// Route to fetch and render the homepage
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "Verital Spa",
            description: "siège veritas alger direction general DG",
        };

        // Fetch all team members
        const teams = await TeamMember.find();

        // Fetch top 4 team members by position, sorted in ascending order
        const topTeamMembers = await TeamMember.find().sort({ position: 1 }).limit(4);

        // Render the index view and pass the locals, teams, and topTeamMembers data
        res.render('index', { locals, teams, topTeamMembers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to create a new team member
router.post('/team', async (req, res) => {
    try {
        // Create a new team member based on request body
        const newTeamMember = new TeamMember({
            name: req.body.name,
            position: req.body.position,
            image: req.body.image,
            socialMedia: {
                facebook: req.body.socialMedia.facebook,
                twitter: req.body.socialMedia.twitter,
                instagram: req.body.socialMedia.instagram,
            },
        });

        // Save the new team member to the database
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
        // Update the team member with the provided ID
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
        // Delete the team member with the provided ID
        await TeamMember.findByIdAndDelete(req.params.id);
        res.redirect('/team');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to create a new division
router.post('/division', async (req, res) => {
    try {
        console.log('Incoming POST data:', req.body); // Debugging line
        const newDivision = new Division(req.body);
        await newDivision.save();
        res.redirect('/division');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a division
router.put('/division/:id', async (req, res) => {
    try {
        await Division.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/division');
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

// Route to fetch and render all divisions
router.get('/division', async (req, res) => {
    try {
        const divisions = await Division.find();
        console.log('Fetched Divisions:', divisions); // Log fetched data for debugging
        res.render('divisions', { divisions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to fetch all team members and top 4 team members by position
router.get('/team', async (req, res) => {
    try {
        // Fetch all team members
        const allTeamMembers = await TeamMember.find();
        
        // Fetch top 4 team members by position, sorted in ascending order
        const topTeamMembers = await TeamMember.find().sort({ position: 1 }).limit(4);
        
        console.log('Fetched All Team Members:', allTeamMembers); // Log fetched data for debugging
        console.log('Fetched Top Team Members:', topTeamMembers); // Log fetched data for debugging
        
        // Pass both sets of data to the template
        res.render('team', { allTeamMembers, topTeamMembers });
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
        const contact1 = await Contact.find();
        console.log('Fetched contacts:', contact1);
        // Render the contact view and pass contact1 data
        res.render('contact', { contact1 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a new profil
router.post('/profile', async (req, res) => {
    try {
        const newProfil = new Profil(req.body);
        const profil = await newProfil.save();
        res.status(201).json(profil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all profils
router.get('/profile', async (req, res) => {
    try {
        const profils = await Profil.find();
        res.render('profil', { profils });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read one profil
router.get('/profile/:id', async (req, res) => {
    try {
        const profil = await Profil.findById(req.params.id);
        res.json(profil);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a profil
router.put('/profile/:id', async (req, res) => {
    try {
        const profil = await Profil.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(profil);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a profil
router.delete('/profile/:id', async (req, res) => {
    try {
        await Profil.findByIdAndDelete(req.params.id);
        res.json({ message: 'Profil deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
