import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.integer('author_id').references('id').inTable('users').notNullable();
    table
      .integer('community_id')
      .references('id')
      .inTable('communities')
      .notNullable();
    table.string('title').notNullable();
    table.string('body');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('posts');
}
