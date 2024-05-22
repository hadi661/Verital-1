const express = require('express');
const router = express.Router();
const Testimonial = require('../models/testimonials');

// Route to create a new testimonial
router.post('/testimonials', async (req, res) => {
    try {
        const newTestimonial = new Testimonial(req.body);
        await newTestimonial.save();
        res.status(201).send(newTestimonial);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to read all testimonials
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to update a testimonial
router.put('/testimonials/:id', async (req, res) => {
    try {
        const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTestimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }
        res.json(updatedTestimonial);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Route to delete a testimonial
router.delete('/testimonials/:id', async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
