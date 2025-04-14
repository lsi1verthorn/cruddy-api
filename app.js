// const express = require('express');
// const app = express();
// const port = 8080;

// app.get('/', (request, response) => {
//   response.send('Hello World!')
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });

// const express = require('express');
// const app = express();
// const port = 8080;
// const jobRoutes = require('./api/jobApi');

// app.use('/api', jobRoutes); // Mount the router under the /api path
// ... start the server ...

// app.js
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
  console.log(`Server listening at http://localhost:${port}`);
});
