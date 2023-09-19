import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AdminAlreadyExistsError } from '@/use-cases/admins/err/admin.already.exists.error'
import { makeRegisterAdminUseCase } from '@/use-cases/factories/admins/make.register.use.case'

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
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).default('ADMIN'),
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
    const registerAdminUseCase = makeRegisterAdminUseCase()

    const admin = await registerAdminUseCase.execute({
      name,
      email,
      password,
      biography,
      location,
      socialLinks,
      role,
      interests,
      avatar: avatarPath,
      banner: bannerPath,
    })

    return reply.status(201).send({ admin })
  } catch (error) {
    if (error instanceof AdminAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
