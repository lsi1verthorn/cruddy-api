const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  try {
    const newApplication = await db.create('job_tracker.application', req.body);

    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the application ', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const application = await db.read('job_tracker.application', req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the application ', message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedApplication = await db.update('job_tracker.application', req.params.id, req.body);

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
    const deletedApplication = await db.remove('job_tracker.application', req.params.id);

    if (!deletedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(deletedApplication);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the application ', message: err.message });
  }
});

// @todo This doesn't return the contact information because that FK is optional and
// doesn't work with the innerjoin implementation
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
    'company.company_name',
    'job.title',
  ];
  const fk = [
    { table: 'application', pk: 'id', fk: 'company_id', relatedTable: 'job_tracker.company' },
    { table: 'application', pk: 'id', fk: 'job_id', relatedTable: 'job_tracker.job' },
  ];

  try {
    const applications = await db.innerjoin('job_tracker.application', data, fk);

    res.json(applications);
  } catch(err){
    res.status(500).json({error: 'Failed to list the applications'});
  }
});

module.exports = router;
