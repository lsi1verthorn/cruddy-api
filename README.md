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

### Running the service on port 3001
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
pnpm run test
```

## Improvements | Issues | Known Bugs
This is a list of items that I would like to do if time permits:

- [ ] Make sure that the postgres schema sql files are up-to-date and reflect the tables, columns,
indices, and validations that are defined.
- [ ] Implement test data for the api so that my UI projects can be run standalone without having a local db.
- [ ] Trigger ^^^ test data via an environment variable or a `pnpm run` command
- [ ] Would it be more correct to return query data in `response.data` as opposed to `response` like in this basic work?
- [ ] Is there any need to provide documentation on how to `grpCurl` against this api?
- [ ] Can this/should this be refactored to reduce code duplication?
  - [ ] Centralized error handling via custom middleware for async errors
  - [ ] Router factories / generic CRUD routers
  - [ ] TypeScript for type safety and better tooling ("Typing")
