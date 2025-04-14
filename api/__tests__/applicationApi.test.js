const request = require('supertest');
const express = require('express');
const applicationApi = require('../../api/applicationApi');
const db = require('../../db/db');

// Mock the db module
jest.mock('../../db/db');

describe('Application Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', applicationApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new application', async () => {
      const newApplication = { application_date: '2023-10-26', referral: false };
      db.create.mockResolvedValue(newApplication);

      const response = await request(app).post('/').send(newApplication);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newApplication);
      expect(db.create).toHaveBeenCalledWith('application', newApplication);
    });

    it('should handle errors during application creation', async () => {
      const errorMessage = 'Database error';
      db.create.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).post('/').send({ application_date: '2023-10-26' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to create the application ', message: errorMessage });
    });
  });

  describe('GET /:id', () => {
    it('should get an application by ID', async () => {
      const application = { id: 1, application_date: '2023-10-26' };
      db.read.mockResolvedValue(application);

      const response = await request(app).get('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(application);
      expect(db.read).toHaveBeenCalledWith('application', '1');
    });

    it('should return 404 if application not found', async () => {
      db.read.mockResolvedValue(null);

      const response = await request(app).get('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Application not found' });
    });

    it('should handle errors during application retrieval', async () => {
      const errorMessage = 'Database error';
      db.read.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch the application ', message: errorMessage });
    });
  });

  describe('PUT /:id', () => {
    it('should update an application', async () => {
      const updatedApplication = { id: 1, application_date: '2023-10-27' };
      db.update.mockResolvedValue(updatedApplication);

      const response = await request(app).put('/1').send({ application_date: '2023-10-27' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedApplication);
      expect(db.update).toHaveBeenCalledWith('application', '1', { application_date: '2023-10-27' });
    });

    it('should return 404 if application not found during update', async () => {
      db.update.mockResolvedValue(null);

      const response = await request(app).put('/1').send({ application_date: '2023-10-27' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Application not found' });
    });

    it('should handle errors during application update', async () => {
      const errorMessage = 'Database error';
      db.update.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).put('/1').send({ application_date: '2023-10-27' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update the application ', message: errorMessage });
    });
  });

  describe('DELETE /:id', () => {
    it('should delete an application', async () => {
      const deletedApplication = { id: 1 };
      db.remove.mockResolvedValue(deletedApplication);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedApplication);
      expect(db.remove).toHaveBeenCalledWith('application', '1');
    });

    it('should return 404 if application not found during delete', async () => {
      db.remove.mockResolvedValue(null);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Application not found' });
    });

    it('should handle errors during application deletion', async () => {
      const errorMessage = 'Database error';
      db.remove.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to delete the application ', message: errorMessage });
    });
  });

  describe('GET /', () => {
    it('should return a list of applications', async () => {
      const applications = [{ id: 1, application_date: '2023-10-26' }, { id: 2, application_date: '2023-10-27' }];
      db.list.mockResolvedValue(applications);

      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(applications);
      expect(db.list).toHaveBeenCalledWith('application');
    });

    it('should handle errors during application listing', async () => {
      const errorMessage = 'Database error';
      db.list.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to list the applications' });
    });
  });
});
