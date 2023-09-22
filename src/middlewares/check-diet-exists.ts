import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'

export async function checkDietIdExists (req: FastifyRequest, reply: FastifyReply): Promise<any> {
  const dietIdSchema = z.object({
    dietId: z.string().uuid()
  })

  const { dietId } = dietIdSchema.parse(req.params)

  const diet = await knex('diets')
    .where('id', dietId)
    .first()

  if (diet === undefined) {
    return await reply.status(401).send({ error: 'Diet ID is not exists' })
  }
}
