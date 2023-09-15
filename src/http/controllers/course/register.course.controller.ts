import { makeRegisterCourseUseCase } from '@/use-cases/factories/courses/make.register.course.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CourseAlreadyExistsError } from '@/use-cases/courses/err/course.already.exists.error'

interface MultipartFile {
  path: string
}

export async function registerCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.string(),
    instructorId: z.string(),
    categoryId: z.string().optional(),
    studentId: z.string().optional(),
  })

  const { title, description, instructorId, categoryId, price } = schema.parse(
    request.body,
  )

  const { path: thumbnail } = request.file as unknown as MultipartFile

  try {
    const registerCourseUseCase = makeRegisterCourseUseCase()

    const course = await registerCourseUseCase.execute({
      title,
      description,
      price,
      thumbnail,
      instructorId,
      categoryId,
    })

    return reply.status(201).send({ course })
  } catch (error) {
    if (error instanceof CourseAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
