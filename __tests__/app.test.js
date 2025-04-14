const assert = require('assert');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

// Mock API modules for testing
const mockApplicationApi = express.Router();
const mockCompanyApi = express.Router();
const mockContactApi = express.Router();
const mockJobApi = express.Router();

const app = express();
const port = 3001; // Use a different port for testing to avoid conflicts

app.use(bodyParser.json());

// Mount the mock endpoints
app.use('/application', mockApplicationApi);
app.use('/company', mockCompanyApi);
app.use('/contact', mockContactApi);
app.use('/job', mockJobApi);

let server;

describe('Express API Tests', () => {
  before((done) => {
    server = app.listen(port, () => {
      console.log(`    Test server listening at http://localhost:${port}`);
      done();
    });
  });

  after((done) => {
    server.close(done);
  });

  it('should parse JSON requests using body-parser', async () => {
    mockApplicationApi.post('/', (req, res) => {
      assert.deepStrictEqual(req.body, { test: 'data' });
      res.status(200).send('OK');
    });

    const response = await axios.post(`http://localhost:${port}/application`, { test: 'data' });
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.data, 'OK');
  });

  it('should handle different API endpoints', async () => {
    mockCompanyApi.get('/test', (req, res) => {
      res.status(200).send('Company Test OK');
    });

    mockContactApi.put('/test', (req, res) => {
      res.status(200).send('Contact Test OK');
    });

      mockJobApi.delete('/test', (req, res) => {
      res.status(200).send('Job Test OK');
    });

    const companyResponse = await axios.get(`http://localhost:${port}/company/test`);
    assert.strictEqual(companyResponse.status, 200);
    assert.strictEqual(companyResponse.data, 'Company Test OK');

    const contactResponse = await axios.put(`http://localhost:${port}/contact/test`);
    assert.strictEqual(contactResponse.status, 200);
    assert.strictEqual(contactResponse.data, 'Contact Test OK');

    const jobResponse = await axios.delete(`http://localhost:${port}/job/test`);
    assert.strictEqual(jobResponse.status, 200);
    assert.strictEqual(jobResponse.data, 'Job Test OK');

  });

  it('should handle multiple requests to different routes', async () => {
    mockCompanyApi.post('/multiple', (req, res) => {
        res.status(200).send("multiple company");
    });
    mockContactApi.post('/multiple', (req, res) => {
        res.status(200).send("multiple contact");
    });

    const companyResponse = await axios.post(`http://localhost:${port}/company/multiple`);
    assert.strictEqual(companyResponse.status, 200);
    assert.strictEqual(companyResponse.data, 'multiple company');

    const contactResponse = await axios.post(`http://localhost:${port}/contact/multiple`);
    assert.strictEqual(contactResponse.status, 200);
    assert.strictEqual(contactResponse.data, 'multiple contact');
  });
});
