const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  try {
    const newCompany = await db.create('company', req.body);

    res.status(201).json(newCompany);
  } catch (err) {
    console.error('Error creating the company: ', err);

    res.status(500).json({ error: 'Failed to create the company ', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const company = await db.read('company', req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    console.error('Error fetching the company: ', err);

    res.status(500).json({ error: 'Failed to fetch the company ', message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCompany = await db.update('company', req.params.id, req.body);

    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(updatedCompany);
  } catch (err) {
    console.error('Error updating the company: ', err);

    res.status(500).json({ error: 'Failed to update the company ', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCompany = await db.remove('company', req.params.id);

    if (!deletedCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(deletedUser);
  } catch (err) {
    console.error('Error deleting the company: ', err);

    res.status(500).json({ error: 'Failed to delete the company ', message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const companies = await db.list('company');

    res.json(companies);
  } catch(err){
    console.error('Error getting the list of companies: ', err);

    res.status(500).json({error: 'Failed to list the companies'});
  }
});

module.exports = router;
