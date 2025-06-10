const request = require('supertest');
const express = require('express');
const companyApi = require('../../api/companyApi');
const db = require('../../db/db');

// Mock the db module
jest.mock('../../db/db');

describe('Company Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', companyApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new company', async () => {
      const newCompany = { name: 'Acme Corp', industry: 'Tech' };
      db.create.mockResolvedValue(newCompany);

      const response = await request(app).post('/').send(newCompany);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newCompany);
      expect(db.create).toHaveBeenCalledWith('job_tracker.company', newCompany);
    });

    it('should handle errors during company creation', async () => {
      const errorMessage = 'Database error';
      db.create.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).post('/').send({ name: 'Acme Corp' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to create the company ', message: errorMessage });
    });
  });

  describe('GET /:id', () => {
    it('should get a company by ID', async () => {
      const company = { id: 1, name: 'Acme Corp' };
      db.read.mockResolvedValue(company);

      const response = await request(app).get('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(company);
      expect(db.read).toHaveBeenCalledWith('job_tracker.company', '1');
    });

    it('should return 404 if company not found', async () => {
      db.read.mockResolvedValue(null);

      const response = await request(app).get('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Company not found' });
    });

    it('should handle errors during company retrieval', async () => {
      const errorMessage = 'Database error';
      db.read.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch the company ', message: errorMessage });
    });
  });

  describe('PUT /:id', () => {
    it('should update a company', async () => {
      const updatedCompany = { id: 1, name: 'Globex Corp' };
      db.update.mockResolvedValue(updatedCompany);

      const response = await request(app).put('/1').send({ name: 'Globex Corp' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedCompany);
      expect(db.update).toHaveBeenCalledWith('job_tracker.company', '1', { name: 'Globex Corp' });
    });

    it('should return 404 if company not found during update', async () => {
      db.update.mockResolvedValue(null);

      const response = await request(app).put('/1').send({ name: 'Globex Corp' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Company not found' });
    });

    it('should handle errors during company update', async () => {
      const errorMessage = 'Database error';
      db.update.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).put('/1').send({ name: 'Globex Corp' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update the company ', message: errorMessage });
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a company', async () => {
      const deletedCompany = { id: 1 };
      db.remove.mockResolvedValue(deletedCompany);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedCompany);
      expect(db.remove).toHaveBeenCalledWith('job_tracker.company', '1');
    });

    it('should return 404 if company not found during delete', async () => {
      db.remove.mockResolvedValue(null);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Company not found' });
    });

    it('should handle errors during company deletion', async () => {
      const errorMessage = 'Database error';
      db.remove.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to delete the company ', message: errorMessage });
    });
  });

  describe('GET /', () => {
    it('should return a list of companies', async () => {
      const companies = [{ id: 1, name: 'Acme Corp' }, { id: 2, name: 'Globex Corp' }];
      db.list.mockResolvedValue(companies);

      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(companies);
      expect(db.list).toHaveBeenCalledWith('job_tracker.company', 'company_name');
    });

    it('should handle errors during company listing', async () => {
      const errorMessage = 'Database error';
      db.list.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to list the companies' });
    });
  });
});
