import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetCategoriesUseCase } from '@/use-cases/factories/categories/make.get.categories.use.case'

export async function getCategoriesController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getCategoriesUseCase = makeGetCategoriesUseCase()
    const categories = await getCategoriesUseCase.execute()

    reply.code(200).send(categories)
  } catch (error) {
    reply.code(500).send({ message: 'Internal server error' })
  }
}
