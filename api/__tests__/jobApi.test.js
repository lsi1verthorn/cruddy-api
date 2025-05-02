const request = require('supertest');
const express = require('express');
const jobApi = require('../../api/jobApi');
const db = require('../../db/db');

// Mock the db module
jest.mock('../../db/db');

describe('Job Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', jobApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new job', async () => {
      const newJob = { title: 'Software Engineer', company: 'Example Inc' };
      db.create.mockResolvedValue(newJob);

      const response = await request(app).post('/').send(newJob);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newJob);
      expect(db.create).toHaveBeenCalledWith('job', newJob);
    });

    it('should handle errors during job creation', async () => {
      const errorMessage = 'Database error';
      db.create.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).post('/').send({ title: 'Software Engineer' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to create the job ', message: errorMessage });
    });
  });

  describe('GET /:id', () => {
    it('should get a job by ID', async () => {
      const job = { id: 1, title: 'Software Engineer' };
      db.read.mockResolvedValue(job);

      const response = await request(app).get('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(job);
      expect(db.read).toHaveBeenCalledWith('job', '1');
    });

    it('should return 404 if job not found', async () => {
      db.read.mockResolvedValue(null);

      const response = await request(app).get('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Job not found' });
    });

    it('should handle errors during job retrieval', async () => {
      const errorMessage = 'Database error';
      db.read.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch the job ', message: errorMessage });
    });
  });

  describe('PUT /:id', () => {
    it('should update a job', async () => {
      const updatedJob = { id: 1, title: 'Senior Software Engineer' };
      db.update.mockResolvedValue(updatedJob);

      const response = await request(app).put('/1').send({ title: 'Senior Software Engineer' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedJob);
      expect(db.update).toHaveBeenCalledWith('job', '1', { title: 'Senior Software Engineer' });
    });

    it('should return 404 if job not found during update', async () => {
      db.update.mockResolvedValue(null);

      const response = await request(app).put('/1').send({ title: 'Senior Software Engineer' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Job not found' });
    });

    it('should handle errors during job update', async () => {
      const errorMessage = 'Database error';
      db.update.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).put('/1').send({ title: 'Senior Software Engineer' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update the job ', message: errorMessage });
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a job', async () => {
      const deletedJob = { id: 1 };
      db.remove.mockResolvedValue(deletedJob);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedJob);
      expect(db.remove).toHaveBeenCalledWith('job', '1');
    });

    it('should return 404 if job not found during delete', async () => {
      db.remove.mockResolvedValue(null);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Job not found' });
    });

    it('should handle errors during job deletion', async () => {
      const errorMessage = 'Database error';
      db.remove.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to delete the job ', message: errorMessage });
    });
  });

  describe('GET /', () => {
    it('should return a list of jobs', async () => {
      const jobs = [{ id: 1, title: 'Software Engineer' }, { id: 2, title: 'Data Scientist' }];
      db.innerjoin.mockResolvedValue(jobs);

      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(jobs);
      expect(db.innerjoin).toHaveBeenCalledWith('job',
        [
          'job.id',
          'job.title',
          'job.description',
          'job.remote',
          'job.salary_range',
          'job.comments',
          'job.company_id',
          'company.company_name',
        ],
        [
          {'fk': 'company_id', 'pk': 'id', 'relatedTable': 'company', 'table': 'job'}
        ],
      );
    });

    it('should handle errors during job listing', async () => {
      const errorMessage = 'Database error';
      db.innerjoin.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to list the jobs' });
    });
  });
});
