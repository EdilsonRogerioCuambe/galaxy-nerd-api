import { makeUpdateStudentUseCaseFactory } from '@/use-cases/factories/students/make.update.student.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { StudentNotFoundError } from '@/use-cases/students/err/student.not.found.error'

interface MultipartFile {
  path: string
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,32}$/),
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).optional(),
    biography: z.string().optional(),
    location: z.string().optional(),
    interests: z.array(z.string()).optional(),
    socialLinks: z.array(z.string()).optional(),
  })

  const {
    name,
    email,
    password,
    biography,
    location,
    socialLinks,
    role,
    interests,
  } = schema.parse(request.body)

  const { path: avatar } = request.file as unknown as MultipartFile

  const { studentId } = request.params as { studentId: string }

  try {
    const updateStudentUseCase = makeUpdateStudentUseCaseFactory()

    const { student } = await updateStudentUseCase.execute({
      studentId,
      name,
      email,
      password,
      avatar,
      biography,
      location,
      socialLinks,
      interests,
      role,
    })

    return reply.status(200).send({ student })
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
