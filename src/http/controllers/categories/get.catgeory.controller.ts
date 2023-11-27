import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetCategoryByIdUseCase } from '@/use-cases/factories/categories/make.get.category.by.id.use.case'
import { CategoryNotFoundError } from '@/use-cases/categories/err/category.not.found.error'

export async function getCategoryByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
  })

  const { id } = schema.parse(request.params)

  const getCategoryByIdUseCase = makeGetCategoryByIdUseCase()

  try {
    const { category } = await getCategoryByIdUseCase.execute({ id })

    reply.send(category)
  } catch (error) {
    if (error instanceof CategoryNotFoundError) {
      reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
