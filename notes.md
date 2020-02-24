## Add package.json
- `npm init -y`

## Install nodemon as a development time dependency
- `npm i nodemon -D`

## Install additional dependencies
- `npm install knex sqlite3`
- `npm install express`
- `npm install -g knex`
- `npm i bcryptjs`

## Change package.json
- Delete `"test": "echo \"Error: no test specified\" && exit 1"`
- Add `"server": "nodemon index.js"`

## Add a “start” script in package.json
- Start script uses node instead of nodemon to run index.js so we can deploy the API later
- Inside the scripts object add `"start": "node index.js"`

## Install dotenv as a production dependency
- `npm install dotenv`

## Create files
- .env
- index.js
- server.js (in root directory or in api folder)

## Inside .env
- Add `PORT=5000`
- Make sure to add .env to .gitignore to prevent it from being uploaded to GitHub
    * `npx gitignore node` will create a custom gitignore

## Inside index.js
- Add `require('dotenv').config();` at the very top
    * *It's recommended to load configuration for .env as early as possible*
- Add `const server = require('./api/server.js');`
- Add `const PORT = process.env.PORT || 4000;`
- Add `server.listen(PORT, () => console.log(`Lisitening on port ${PORT}...`));`

## Inside server.js
- Add `const express = require('express');`
- Add `const server = express();`
- Add `server.use(express.json());`
- Add (optional) `server.get('/', (req, res) => res.send('<h1>Hello from Node auth1 Project</h1>'));`
- Add `module.exports = server;`

## Initialize knex
- `knex init`

## Edit knexfile.js
**BEFORE**
```js
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
}
```
**AFTER**
```js
module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
          filename: './data/users.db3'
        },
        useNullAsDefault: true,
        migrations: {
          directory: './data/migrations'
        },
        seeds: {
          directory: './data/seeds'
        },
        pool: {
          afterCreate: (conn, done) => {
            // runs after a connection is made to the sqlite engine
            conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
          },
        },
      },
}
```
- The `development.connection.filename` will create and name the database
    * **IMPORTANT** path should start at root of the repo, not the configuration file itself
- The `development.pool` is needed when using foreign keys

## Add folder with a router file inside. Name accordingly
- Example
    * `users` folder
    * `users-router.js` file
- Add `const express = require('express');`
- Add `const router = express.Router();`
- Add `module.exports = router;`

## Inside server.js
*Change names according to the router name and file structure*
- Add `const usersRouter = require('./users/users-router');`
    * Goes under `const express = require('express');`
- Add `server.use('/api/users', usersRouter);`
    * Goes under `server.use(express.json());`

## Add data folder with a dbConfig.js file
- Add `const knex = require('knex');`
- Add `const configOptions = require('../knexfile').development;`
- Add `module.exports = knex(configOptions);`

## Inside users-router.js
- Add `const db = require('../data/dbConfig');`
    * This will be replaced later when `users-model.js` is built

## Create a migration
- `knex migrate:make create_users_table`

## Inside new migration file
- Create a table however you please
- Add migration `knex migrate:latest`

## Prepare for adding seeds
- Run `npm install knex-cleaner`
- Run `knex seed:make 00-cleanup`
- Inside the cleanup seed add
```js
const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    // resets ids
    mode: 'truncate',
    // don't empty migration tables
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], 
  });
};
```
- This removes all tables (excluding the two tables that track migrations) in the correct order before any seed files run.

## Make seeds
- **Important** create seeds *in the same order you created your tables* 
    * In other words, don’t create a seed with a foreign key, until that reference record exists
**Example Seeds**
- `knex seed:make 01-users`
- `knex seed:make 02-profile`

## Inside each seed
- Change all `table_name`'s to the name of the table
- Remove the following code block:
```js
  return knex('profile').del()
    .then(function () {
    });
```
- Seeds should now look like:
```js
exports.seed = function(knex) {
  // Inserts seed entries
  return knex('profile').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
};
```
- Add data to your seeds accordingly
- Run `knex seed:run` when done

## Add model (or database access file)
- Example
    * Inside users folder create `users-model.js`
- Add `const db = require('../data/dbConfig');`
- Add `module.exports = {}`

## Inside router file
- Replace `const db = require('../data/dbConfig');` with `const Users = require('./users-model');`
