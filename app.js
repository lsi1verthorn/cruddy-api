const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const applicationApi = require('./api/applicationApi');
const companyApi = require('./api/companyApi');
const contactApi = require('./api/contactApi');
const jobApi = require('./api/jobApi');

const app = express();
const port = 3000;

app.use(bodyParser.json());


// Enable CORS for specific origins
// Allow connection requests from localhost:51*
const allowedOriginRegex = /^https?:\/\/localhost:51.*$/;

const corsOptions = {
  /* credentials: true, // to set up for a request that needs to use credentials */
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: function (origin, callback) {
    if (allowedOriginRegex.test(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Mount the endpoints
app.use('/application', applicationApi);
app.use('/company', companyApi);
app.use('/contact', contactApi);
app.use('/job', jobApi);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
