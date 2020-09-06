import knex, { Config } from 'knex';
import path from 'path';

import { config } from '../config';

const knexConfig: Config = {
  client: 'pg',
  connection: {
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
  },
  migrations: {
    directory: path.join(__dirname, '/src/database/migrations'),
  },
};

export const db = knex(knexConfig);
