import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('community_members', (table) => {
    table.primary(['user_id', 'community_id']);
    table.integer('user_id').references('id').inTable('users').notNullable();
    table
      .integer('community_id')
      .references('id')
      .inTable('communities')
      .notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('community_members');
}
