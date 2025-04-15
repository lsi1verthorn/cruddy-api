const bodyParser = require('body-parser');
const express = require('express');

const applicationApi = require('./api/applicationApi');
const companyApi = require('./api/companyApi');
const contactApi = require('./api/contactApi');
const jobApi = require('./api/jobApi');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mount the endpoints
app.use('/application', applicationApi);
app.use('/company', companyApi);
app.use('/contact', contactApi);
app.use('/job', jobApi);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
