import { randomUUID } from 'node:crypto'
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'
import { checkUserIdExists } from '@/middlewares/check-user-exists'

export async function users (server: FastifyInstance): Promise<any> {
  server.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const userSchema = z.object({
      name: z.string(),
      lastName: z.string(),
      age: z.number(),
      weight: z.number()
    })

    const { name, lastName, age, weight } = userSchema.parse(req.body)

    await knex('users').insert({
      id: randomUUID(),
      name,
      last_name: lastName,
      age,
      weight
    })

    return await reply.status(201).send()
  })

  server.get('/:userId', { preHandler: [checkUserIdExists] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { userId } = req.params

    const diets = await knex('diets')
      .where('user_id', userId)

    return await reply.status(201).send(diets)
  })

  server.get('/:userId/metrics', { preHandler: [checkUserIdExists] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { userId } = req.params

    const diets = await knex('diets')
      .where('user_id', userId)

    const metrics = {
      totalDiets: diets.length,
      inDiet: diets.filter(diet => diet.in_diet === 1).length,
      outDiet: diets.filter(diet => diet.in_diet === 0).length
    }

    if (diets.length < 1) {
      return await reply.status(401).send({ error: 'This user does not have any diet' })
    }

    return await reply.status(201).send(metrics)
  })
}
