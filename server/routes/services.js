const express = require('express');
const router = express.Router();
const Services = require('../models/services');
const Division = require('../models/division');

// Route to create a new service
router.post('/service', async (req, res) => {
    try {
        console.log('Incoming POST data:', req.body);
        const newService = new Services(req.body);
        await newService.save();
        res.redirect('/service');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a service
router.put('/service/:id', async (req, res) => {
    try {
        await Services.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/service');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to delete a service
router.delete('/service/:id', async (req, res) => {
    try {
        await Services.findByIdAndDelete(req.params.id);
        res.redirect('/service');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

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
