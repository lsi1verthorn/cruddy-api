const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  try {
    const newApplication = await db.create('application', req.body);

    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the application ', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const application = await db.read('application', req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the application ', message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedApplication = await db.update('application', req.params.id, req.body);

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(updatedApplication);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the application ', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedApplication = await db.remove('application', req.params.id);

    if (!deletedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(deletedApplication);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the application ', message: err.message });
  }
});

// @todo Obviously need to figure out something better than this with typing
router.get('/', async (req, res) => {
  const data = [
    'application.id',
    'application.application_date',
    'application.referral',
    'application.referred_by',
    'application.contacted',
    'application.status',
    'application.rejection_date',
    'application.comments',
    'application.cover_letter',
    'application.company_id',
    'application.contact_id',
    'application.job_id',
    'contact.contact_name',
    'contact.contact_email',
    'company.name',
    'job.title',
  ];
  const fk = [
    { table: 'application', pk: 'id', fk: 'company_id', relatedTable: 'company' },
    { table: 'application', pk: 'id', fk: 'contact_id', relatedTable: 'contact' },
    { table: 'application', pk: 'id', fk: 'job_id', relatedTable: 'job' },
  ];

  try {
    const applications = await db.innerjoin('application', data, fk);

    res.json(applications);
  } catch(err){
    res.status(500).json({error: 'Failed to list the applications'});
  }
});

module.exports = router;
