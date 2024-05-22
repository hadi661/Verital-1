const express = require('express');
const router = express.Router();
const Service = require('../models/services');

// Route to create a new service
router.post('/services', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).send(newService);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to read all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a service
router.put('/services/:id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json(updatedService);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to delete a service
router.delete('/services/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
