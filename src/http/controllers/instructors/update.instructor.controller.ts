import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InstructorNotFoundError } from '@/use-cases/instructors/err/instructor.not.found.error'
import { makeUpdateInstructorUseCase } from '@/use-cases/factories/instructors/make.update.instructor.use.case'

interface MultipartFile {
  path: string
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,32}$/)
      .optional(),
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).optional(),
    biography: z.string().optional(),
    location: z.string().optional(),
  })

  const { name, email, password, biography, location, role } = schema.parse(
    request.body,
  )

  const { path: avatar } = request.file as unknown as MultipartFile

  const { instructorId } = request.params as { instructorId: string }

  try {
    const updateInstructorUseCase = makeUpdateInstructorUseCase()

    const { instructor } = await updateInstructorUseCase.execute({
      instructorId,
      name,
      email,
      password,
      avatar,
      biography,
      location,
      role,
    })

    return reply.status(200).send({ instructor })
  } catch (error) {
    if (error instanceof InstructorNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
