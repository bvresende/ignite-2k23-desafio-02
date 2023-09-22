import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (user) => {
    user.uuid('id').primary()
    user.text('name').notNullable()
    user.text('last_name').notNullable()
    user.integer('age').notNullable()
    user.integer('weight').notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
