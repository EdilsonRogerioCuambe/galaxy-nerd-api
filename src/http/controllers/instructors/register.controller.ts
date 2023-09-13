import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InstructorAlreadyExistsError } from '@/use-cases/instructors/err/instructor.already.exists.error'
import { makeRegisterInstructor } from '@/use-cases/factories/instructors/make.register.instructor.use.case'

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
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).default('INSTRUCTOR'),
    biography: z.string().optional(),
    location: z.string().optional(),
    socialLinks: z.array(z.string()).optional(),
  })

  const { name, email, password, biography, location, socialLinks, role } =
    schema.parse(request.body)

  const { path: avatar } = request.file as unknown as MultipartFile

  try {
    const registerInstructorUseCase = makeRegisterInstructor()

    const instructor = await registerInstructorUseCase.execute({
      name,
      email,
      password,
      avatar,
      biography,
      location,
      socialLinks,
      role,
    })

    return reply.status(201).send({ instructor })
  } catch (error) {
    if (error instanceof InstructorAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
