import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteCourseUseCase } from '@/use-cases/factories/courses/make.delete.use.case'
import { CourseNotFoundError } from '@/use-cases/courses/err/course.not.found.error'

export async function deleteCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    courseId: z.string(),
  })

  const { courseId } = schema.parse(request.params)

  try {
    const deleteCourseUseCase = makeDeleteCourseUseCase()

    await deleteCourseUseCase.execute({ courseId })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof CourseNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
