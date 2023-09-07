import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterStudentUseCase } from '@/use-cases/factories/students/make.register.student.use.case'
import { StudentAlreadyExistsError } from '@/use-cases/students/err/student.already.exists.error'

interface MultipartFile {
  path: string
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,32}$/),
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).default('STUDENT'),
    biography: z.string().optional(),
    location: z.string().optional(),
    socialLinks: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
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

  try {
    const registerStudentUseCase = makeRegisterStudentUseCase()

    const student = await registerStudentUseCase.execute({
      name,
      email,
      password,
      avatar,
      biography,
      location,
      socialLinks,
      role,
      interests,
    })

    return reply.status(201).send({ student })
  } catch (error) {
    if (error instanceof StudentAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
