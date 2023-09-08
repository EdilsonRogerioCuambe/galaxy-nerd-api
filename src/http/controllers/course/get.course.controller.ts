import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetCourseUseCase } from '@/use-cases/factories/courses/make.get.course.use.case'
import { CourseNotFoundError } from '@/use-cases/courses/err/course.not.found.error'

export async function getCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    courseId: z.string(),
  })

  const { courseId } = schema.parse(request.params)

  try {
    const getCourseUseCase = makeGetCourseUseCase()

    const course = await getCourseUseCase.execute({ courseId })

    return reply.status(200).send({ course })
  } catch (error) {
    if (error instanceof CourseNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send()
  }
}
