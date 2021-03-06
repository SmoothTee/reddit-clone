import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('communities', (table) => {
    table.increments();
    table
      .integer('creator_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable();
    table.string('name').notNullable().unique();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('communities');
}
