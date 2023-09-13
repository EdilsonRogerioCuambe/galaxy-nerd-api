import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateCategoryUseCase } from '@/use-cases/factories/categories/make.update.category.use.case'
import { CategoryNotFoundError } from '@/use-cases/categories/err/category.not.found.error'

interface MultipartFile {
  path: string
}

export async function updateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    categoryId: z.string(),
    name: z.string(),
    description: z.string(),
  })

  const { name, description } = schema.parse(request.body)

  const { categoryId } = request.params as { categoryId: string }

  const { path: icon } = request.file as unknown as MultipartFile

  try {
    const updateCategoryUseCase = makeUpdateCategoryUseCase()

    const category = await updateCategoryUseCase.execute({
      categoryId,
      name,
      description,
      icon,
    })

    return reply.status(200).send({ category })
  } catch (error) {
    if (error instanceof CategoryNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
