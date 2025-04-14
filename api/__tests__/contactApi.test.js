const request = require('supertest');
const express = require('express');
const contactApi = require('../../api/contactApi'); // Adjust the path as needed
const db = require('../../db/db'); // Adjust the path as needed

// Mock the db module
jest.mock('../../db/db');

describe('Contact Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', contactApi);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /', () => {
    it('should create a new contact', async () => {
      const newContact = { name: 'John Doe', email: 'john.doe@example.com' };
      db.create.mockResolvedValue(newContact);

      const response = await request(app).post('/').send(newContact);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newContact);
      expect(db.create).toHaveBeenCalledWith('contact', newContact);
    });

    it('should handle errors during contact creation', async () => {
      const errorMessage = 'Database error';
      db.create.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).post('/').send({ name: 'John Doe' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to create the contact ', message: errorMessage });
    });
  });

  describe('GET /:id', () => {
    it('should get a contact by ID', async () => {
      const contact = { id: 1, name: 'John Doe' };
      db.read.mockResolvedValue(contact);

      const response = await request(app).get('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(contact);
      expect(db.read).toHaveBeenCalledWith('contact', '1');
    });

    it('should return 404 if contact not found', async () => {
      db.read.mockResolvedValue(null);

      const response = await request(app).get('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Contact not found' });
    });

    it('should handle errors during contact retrieval', async () => {
      const errorMessage = 'Database error';
      db.read.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to fetch the contact ', message: errorMessage });
    });
  });

  describe('PUT /:id', () => {
    it('should update a contact', async () => {
      const updatedContact = { id: 1, name: 'Jane Doe' };
      db.update.mockResolvedValue(updatedContact);

      const response = await request(app).put('/1').send({ name: 'Jane Doe' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedContact);
      expect(db.update).toHaveBeenCalledWith('contact', '1', { name: 'Jane Doe' });
    });

    it('should return 404 if contact not found during update', async () => {
      db.update.mockResolvedValue(null);

      const response = await request(app).put('/1').send({ name: 'Jane Doe' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Contact not found' });
    });

    it('should handle errors during contact update', async () => {
      const errorMessage = 'Database error';
      db.update.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).put('/1').send({ name: 'Jane Doe' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update the contact ', message: errorMessage });
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a contact', async () => {
      const deletedContact = { id: 1 };
      db.remove.mockResolvedValue(deletedContact);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedContact);
      expect(db.remove).toHaveBeenCalledWith('contact', '1');
    });

    it('should return 404 if contact not found during delete', async () => {
      db.remove.mockResolvedValue(null);

      const response = await request(app).delete('/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Contact not found' });
    });

    it('should handle errors during contact deletion', async () => {
      const errorMessage = 'Database error';
      db.remove.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to delete the contact ', message: errorMessage });
    });
  });

  describe('GET /', () => {
    it('should return a list of contacts', async () => {
      const contacts = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
      db.list.mockResolvedValue(contacts);

      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(contacts);
      expect(db.list).toHaveBeenCalledWith('contact');
    });

    it('should handle errors during contact listing', async () => {
      const errorMessage = 'Database error';
      db.list.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to list the contacts' });
    });
  });
});
