import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comments', (table) => {
    table.increments();
    table.integer('author_id').references('id').inTable('users').notNullable();
    table.integer('post_id').references('id').inTable('posts').notNullable();
    table.integer('parent_id').references('id').inTable('comments');
    table.string('body').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('comments');
}
