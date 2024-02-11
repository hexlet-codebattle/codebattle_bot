export async function createSchema(knex) {
  if (await knex.schema.hasTable('chat_subscriptions')) {
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await knex.schema.createTable('chat_subscriptions', (table) => {
    table.increments('id').primary();
    table.string('messengerType');
    table.integer('messengerChannelId');
    table.string('topic');
    table.string('status');
  });
}
