import fastify from 'fastify'
import { users } from './rotes/users'
import { diets } from './rotes/diets'

export const app = fastify()

void app.register(users, {
  prefix: 'users'
})

void app.register(diets, {
  prefix: 'diets'
})
