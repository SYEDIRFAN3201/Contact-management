const { Contact } = require('../models');

// Get all contacts
const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.findAll();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

// Add a new contact
const addContact = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, company, jobTitle } = req.body;
        const newContact = await Contact.create({ firstName, lastName, email, phone, company, jobTitle });
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
};

// Update an existing contact
const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, company, jobTitle } = req.body;
        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        await contact.update({ firstName, lastName, email, phone, company, jobTitle });
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

// Delete a contact
const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByPk(id);

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        await contact.destroy();
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllContacts, addContact, updateContact, deleteContact };
