const request = require('supertest');
const { expect } = require('chai');
const express = require('express');

const applicationApi = require('../api/applicationApi');
const companyApi = require('../api/companyApi');
const contactApi = require('../api/contactApi');
const jobApi = require('../api/jobApi');

describe('Express Application', () => {
  let app;

  before(() => {
    // Before all tests, create a new Express app instance
    // This ensures a clean slate for each test run
    app = express();
    app.use(express.json());

    // Replicate CORS setup for testing
    const allowedOriginRegex = /^https?:\/\/localhost:51.*$/;

    const corsOptions = {
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      origin: function (origin, callback) {
        if (allowedOriginRegex.test(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    };

    const cors = require('cors');
    app.use(cors(corsOptions));

    /**
     * @type {import('express').ErrorRequestHandler}
     */
    const errorHandler = (err, req, res, next) => {
      if (err.message === 'Not allowed by CORS') {
        res.status(403).send('Forbidden: Not allowed by CORS policy.');
      } else {
        next(err);
      }
    };
    app.use(errorHandler);

    // Mount API route
    app.use('/application', applicationApi);
    app.use('/company', companyApi);
    app.use('/contact', contactApi);
    app.use('/job', jobApi);
  });

  // Test Case 1: Check if the server responds to a basic GET request to a non-existent route
  it('should return 404 for an unknown route', (done) => {
    request(app)
      .get('/nonexistent-route')
      .expect(404)
      .end(done);
  });

  // Test Case 2: Test CORS for an allowed origin
  it('should allow requests from an allowed origin (CORS)', (done) => {
    request(app)
      .get('/application')
      .set('Origin', 'https://localhost:5173')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['access-control-allow-origin']).to.equal('https://localhost:5173');
        done();
      });
  });

  // Test Case 3: Test CORS for a disallowed origin
  it('should disallow requests from a disallowed origin (CORS)', (done) => {
    request(app)
      .get('/job')
      .set('Origin', 'https://www.bad-domain.com')
      .end((err, res) => {
        if (res.header['access-control-allow-origin']) {
          return done(new Error('CORS header found for disallowed origin'));
        }
        expect(res.status).to.be.oneOf([403, 404]);
        done();
      });
  });

  // Test Case 4: Verify if a specific API route is mounted and responds
  it('should have the /application route mounted', (done) => {
    request(app)
      .get('/application/')
      .expect(200)
      .end(done);
  });

  it('should have the /company route mounted', (done) => {
    request(app)
      .get('/company/')
      .expect(200)
      .end(done);
  });

  it('should have the /contact route mounted', (done) => {
    request(app)
      .get('/contact/')
      .expect(200)
      .end(done);
  });

  it('should have the /job route mounted', (done) => {
    request(app)
      .get('/job/')
      .expect(200)
      .end(done);
  });
});
