import { type Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable('diets', (diet) => {
    diet.uuid('id').primary()
    diet.uuid('user_id')
    diet.text('name').notNullable()
    diet.text('description').notNullable()
    diet.text('date_and_hour').notNullable()
    diet.boolean('in_diet').notNullable()

    diet.foreign('user_id').references('users.id')
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable('diets')
}
