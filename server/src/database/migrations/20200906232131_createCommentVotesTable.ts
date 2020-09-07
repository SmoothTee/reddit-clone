import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comment_votes', (table) => {
    table.primary(['user_id', 'comment_id']);
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .unsigned()
      .notNullable();
    table
      .integer('comment_id')
      .references('id')
      .inTable('comments')
      .unsigned()
      .notNullable();
    table.integer('vote').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('comment_votes');
}
