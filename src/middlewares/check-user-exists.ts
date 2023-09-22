import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { knex } from '@/database'

export async function checkUserIdExists (req: FastifyRequest, reply: FastifyReply): Promise<any> {
  const userIdSchema = z.object({
    userId: z.string().uuid()
  })

  const { userId } = userIdSchema.parse(req.params)

  const user = await knex('users')
    .where('id', userId)
    .first()

  if (user === undefined) {
    return await reply.status(401).send({ error: 'User ID is not exists' })
  }
}
