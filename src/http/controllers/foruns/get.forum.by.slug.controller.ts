import { makeGetForumBySlugUseCase } from '@/use-cases/factories/forums/make.get.forum.by.slug.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ForumNotFoundError } from '@/use-cases/foruns/error/forum.not.found.error'

export async function getForumBySlugController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    slug: z.string(),
  })

  const { slug } = schema.parse(request.params)

  try {
    const getForumBySlugUseCase = makeGetForumBySlugUseCase()

    const forum = await getForumBySlugUseCase.execute({ slug })

    return reply.status(200).send({ forum })
  } catch (error) {
    if (error instanceof ForumNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
