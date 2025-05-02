const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  try {
    const newJob = await db.create('job', req.body);

    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the job ', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await db.read('job', req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the job ', message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await db.update('job', req.params.id, req.body);

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the job ', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await db.remove('job', req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(deletedJob);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete the job ', message: err.message });
  }
});

// @todo Obviously need to figure out something better than this with typing
router.get('/', async (req, res) => {
  const data = [
    'job.id',
    'job.title',
    'job.description',
    'job.remote',
    'job.salary_range',
    'job.comments',
    'job.company_id',
    'company.company_name',
  ];
  const fk = [
    { table: 'job', pk: 'id', fk: 'company_id', relatedTable: 'company' },
  ];

  try {
    const jobs = await db.innerjoin('job', data, fk);

    res.json(jobs);
  } catch(err){
    res.status(500).json({error: 'Failed to list the jobs'});
  }
});

module.exports = router;
