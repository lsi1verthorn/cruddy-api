const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  try {
    const newContact = await db.create('contact', req.body);

    res.status(201).json(newContact);
  } catch (err) {
    console.error('Error creating the contact: ', err);

    res.status(500).json({ error: 'Failed to create the contact ', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contact = await db.read('contact', req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  } catch (err) {
    console.error('Error fetching the contact: ', err);

    res.status(500).json({ error: 'Failed to fetch the contact ', message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedContact = await db.update('contact', req.params.id, req.body);

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(updatedContact);
  } catch (err) {
    console.error('Error updating the contact: ', err);

    res.status(500).json({ error: 'Failed to update the contact ', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await db.remove('contact', req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(deletedUser);
  } catch (err) {
    console.error('Error deleting the contact: ', err);

    res.status(500).json({ error: 'Failed to delete the contact ', message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const contacts = await db.list('contact');

    res.json(contacts);
  } catch(err){
    console.error('Error getting the list of contacts: ', err);

    res.status(500).json({error: 'Failed to list the contacts'});
  }
});

module.exports = router;
