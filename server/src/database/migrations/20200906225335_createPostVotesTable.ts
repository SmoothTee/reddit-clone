import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_votes', (table) => {
    table.primary(['user_id', 'post_id']);
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable();
    table
      .integer('post_id')
      .references('id')
      .inTable('posts')
      .unsigned()
      .notNullable();
    table.integer('vote').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('post_votes');
}
