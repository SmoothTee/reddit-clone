import knex from 'knex';

import { config } from '../config';

const knexConfig = {
  client: 'pg',
  connection: {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
  },
};

export const db = knex(knexConfig);
