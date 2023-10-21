import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateCourseUseCase } from '@/use-cases/factories/courses/make.update.course.use.case'
import { CourseNotFoundError } from '@/use-cases/courses/err/course.not.found.error'

interface MultipartFile {
  path: string
}

export async function updateCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    courseId: z.string(),
    title: z.string(),
    description: z.string().optional(),
    price: z.string(),
    instructorId: z.string(),
    categoryId: z.string().optional(),
  })

  const { title, description, instructorId, price } = schema.parse(request.body)

  const { path: thumbnail } = request.file as unknown as MultipartFile

  const { courseId } = request.params as { courseId: string }

  try {
    const updateCourseUseCase = makeUpdateCourseUseCase()

    const course = await updateCourseUseCase.execute({
      courseId,
      title,
      description,
      price,
      thumbnail,
      instructorId,
    })

    return reply.status(200).send({ course })
  } catch (error) {
    if (error instanceof CourseNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
