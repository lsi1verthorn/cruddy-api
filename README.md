# cruddy-api
Basic CRUD API for rudimentary postgres db

## Description
This is a very basic `express` app for accessing a small `postgres` db locally where job search
applications and related information are stored. This is by no-means meant to
be a complete api, and it lacks some fundamentals like robust error checking and performance tuning.

Note: This service expects a `postgres` instance to be configured and running. See this [link](https://www.atlassian.com/data/sql/how-to-start-a-postgresql-server-on-mac-os-x) for instructions to set one up on a Mac. You might also want to download a DB visualization tool - here is one that I've been using [DBeaver](https://dbeaver.io/download/).

## Development
This repo uses `pnpm` and `node`

Download the repo from `git` using your preferred method (`git clone` etc.) and follow these instructions:

### Installation
To install `node_modules` run
```bash
pnpm install
```

### Build
```bash
pnpm run build
```

### Running the service on port 3000
```bash
pnpm run dev
```

### Database schema
In the `db/sql` directory, there are four sql files that can be used to create the necessary `postgres` tables:

- `Application` - holds the actual application details - date, status, company etc.
- `Company` - Company name and website (required for application)
- `Contact` - Contact information - this could be a personal reference or company contact information (optional)
- `Job` - Job information including title, salary information and any referral information (required)

### Debugging
To debug, stop the service if it is running and from the top level directory, run
```bash
node inspect app.js
```

**Note:** You will need to run whichever debugging tool you prefer, such as `chrome://inspect/#devices`

### Unit Tests
From the top level directory
```bash
# Run all unit tests
pnpm run test
```
```bash
# Run just the `mocha` tests
pnpm run test:mocha-app
```
```bash
# Run just the `jest` tests
pnpm run test:jest-rest
```

## Improvements | Issues | Known Bugs
This is a list of items that I would like to complete as time permits:

- [#1](https://github.com/lsi1verthorn/cruddy-api/issues/1) Add Test Data
- [#2](https://github.com/lsi1verthorn/cruddy-api/issues/2) Update DB Schema
- [#3](https://github.com/lsi1verthorn/cruddy-api/issues/3) Spike: Query response data
- [#4](https://github.com/lsi1verthorn/cruddy-api/issues/4) DRY out / refactor as applicable
- [#5](https://github.com/lsi1verthorn/cruddy-api/issues/5) Additional documentation

