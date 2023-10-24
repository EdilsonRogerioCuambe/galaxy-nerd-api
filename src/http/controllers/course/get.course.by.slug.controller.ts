import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CourseNotFoundError } from '@/use-cases/courses/err/course.not.found.error'
import { makeGetCourseBySlugUseCase } from '@/use-cases/factories/courses/make.get.course.by.slug.use.case'

export async function getCourseBySlugController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    slug: z.string(),
  })

  const { slug } = schema.parse(request.params)

  try {
    const getCourseBySlugUseCase = makeGetCourseBySlugUseCase()

    const course = await getCourseBySlugUseCase.execute({ slug })

    return reply.status(200).send({ course })
  } catch (error) {
    if (error instanceof CourseNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send()
  }
}
