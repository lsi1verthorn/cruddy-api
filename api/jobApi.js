const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/', async (req, res) => {
  try {
    const newJob = await db.create('job', req.body);

    res.status(201).json(newJob);
  } catch (err) {
    console.error('Error creating the job: ', err);

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
    console.error('Error fetching the job: ', err);

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
    console.error('Error updating the job: ', err);

    res.status(500).json({ error: 'Failed to update the job ', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await db.remove('job', req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(deletedUser);
  } catch (err) {
    console.error('Error deleting the job: ', err);

    res.status(500).json({ error: 'Failed to delete the job ', message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const jobs = await db.list('job');

    res.json(jobs);
  } catch(err){
    console.error('Error getting the list of jobs: ', err);

    res.status(500).json({error: 'Failed to list the jobs'});
  }
});

module.exports = router;
