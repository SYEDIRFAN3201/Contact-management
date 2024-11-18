const express = require('express');
const Contact = require('../models/contact'); // Import the Mongoose model

const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new contact
router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body); // Create a new contact
        await newContact.save(); // Save to the database
        res.status(201).json(newContact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a contact by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a contact by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted', deletedContact });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

