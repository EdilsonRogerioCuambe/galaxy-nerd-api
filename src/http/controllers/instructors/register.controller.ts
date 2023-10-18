import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InstructorAlreadyExistsError } from '@/use-cases/instructors/err/instructor.already.exists.error'
import { makeRegisterInstructor } from '@/use-cases/factories/instructors/make.register.instructor.use.case'

interface MultipartFile {
  path: string
}

interface Files {
  avatar: MultipartFile[]
  banner: MultipartFile[]
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

  const { avatar, banner } = request.files as unknown as Files

  const avatarPath = avatar[0].path
  const bannerPath = banner[0].path

  try {
    const registerInstructorUseCase = makeRegisterInstructor()

    const instructor = await registerInstructorUseCase.execute({
      name,
      email,
      password,
      avatar: avatarPath,
      banner: bannerPath,
      interests,
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
