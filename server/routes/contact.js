const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

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
        const contact1= await Contact.find();
        console.log('Fetched contacts:', contact1);
        res.status(200).json(contact1);
        res.render('contact', { contact1 });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
