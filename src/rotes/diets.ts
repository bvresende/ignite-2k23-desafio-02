import { randomUUID } from 'node:crypto'
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'
import { checkUserIdExists } from '@/middlewares/check-user-exists'
import { checkDietIdExists } from '@/middlewares/check-diet-exists'

export async function diets (server: FastifyInstance): Promise<any> {
  server.post('/:userId', { preHandler: [checkUserIdExists] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { userId } = req.params

    const dietSchema = z.object({
      name: z.string(),
      description: z.string(),
      dateAndHour: z.string(),
      inDiet: z.boolean()
    })

    const { name, description, dateAndHour, inDiet } = dietSchema.parse(req.body)

    await knex('diets').insert({
      id: randomUUID(),
      user_id: userId,
      name,
      description,
      date_and_hour: dateAndHour,
      in_diet: inDiet
    })

    return await reply.status(201).send()
  })

  server.put('/:dietId', { preHandler: [checkDietIdExists] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { dietId } = req.params

    const dietSchema = z.object({
      name: z.string(),
      description: z.string(),
      dateAndHour: z.string(),
      inDiet: z.boolean()
    })

    const { name, description, dateAndHour, inDiet } = dietSchema.parse(req.body)

    await knex('diets')
      .where('id', dietId)
      .update({
        name,
        description,
        date_and_hour: dateAndHour,
        in_diet: inDiet
      })

    return await reply.status(201).send()
  })

  server.delete('/:dietId', { preHandler: [checkDietIdExists] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { dietId } = req.params

    await knex('diets')
      .where('id', dietId)
      .del()

    return await reply.status(200).send('Deletion was successful')
  })

  server.get('/:dietId', { preHandler: [checkDietIdExists] }, async (req: FastifyRequest, reply: FastifyReply) => {
    const { dietId } = req.params

    const diet = await knex('diets')
      .where('id', dietId)
      .first()

    return await reply.status(200).send(diet)
  })
}
