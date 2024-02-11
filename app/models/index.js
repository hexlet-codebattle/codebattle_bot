import { Model } from 'objection';
import Knex from 'knex';
import { createSchema } from './schemas';
import logger from '../logger';

/**
 * @typedef {import('knex').Knex.Config} KnexConfig
 *
 * @function
 * @param {?KnexConfig} Knex configuration for database
 */
const setup = (
  params = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: { filename: 'tmp/example.db' },
  },
) => {
  const knex = Knex(params);

  Model.knex(knex);

  createSchema(knex)
    .then(() => {})
    .then(() => knex.destroy())
    .catch((err) => {
      logger.error(JSON.stringify(err, null, 2));
      return knex.destroy();
    });
};

export default setup;
