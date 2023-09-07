import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterCategoryUseCase } from '@/use-cases/factories/categories/make.register.category.use.case'
import { CategoryAlreadyExistsError } from '@/use-cases/categories/err/cateogory.already.exists.error'

interface MultipartFile {
  path: string
}

export async function registerCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    name: z.string(),
    description: z.string().optional(),
  })

  const { name, description } = schema.parse(request.body)

  const { path: icon } = request.file as unknown as MultipartFile

  try {
    const registerCategoryUseCase = makeRegisterCategoryUseCase()

    const category = await registerCategoryUseCase.execute({
      name,
      description,
      icon,
    })

    return reply.status(201).send({ category })
  } catch (error) {
    if (error instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
