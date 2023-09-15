import { makeCreateEnrollmentUseCase } from '@/use-cases/factories/enrollments/make.create.enrollments.use.case'
import { StudentNotFoundError } from '@/use-cases/students/err/student.not.found.error'
import { CourseNotFoundError } from '@/use-cases/courses/err/course.not.found.error'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function createEnrollmentController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    studentId: z.string(),
    courseId: z.string(),
  })

  const { studentId, courseId } = schema.parse(request.body)

  try {
    const createEnrollmentUseCase = makeCreateEnrollmentUseCase()

    const { enrollment } = await createEnrollmentUseCase.execute({
      studentId,
      courseId,
    })

    return reply.status(201).send({ enrollment })
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    if (error instanceof CourseNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
