# cruddy-api
Basic CRUD API for rudimentary postgres db

## Description
This is a very basic `express` app for accessing a small `postgres` db locally where job search
applications and related information are stored. This is by no-means meant to
be a complete api, and it lacks some fundamentals like robust error checking and performance tuning.

## Development
This repo uses `pnpm` and `node`. Download the repo from `git` using your preferred method (`git clone` etc.) and follow these instructions:

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

