import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AdminAlreadyExistsError } from '@/use-cases/admins/err/admin.already.exists.error'
import { makeRegisterAdminUseCase } from '@/use-cases/factories/admins/make.register.use.case'

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
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']),
    biography: z.string().optional(),
    location: z.string().optional(),
    socialLinks: z.array(z.string()).optional(),
  })

  const { name, email, password, biography, location, socialLinks, role } =
    schema.parse(request.body)

  const { path: avatar } = request.file as unknown as MultipartFile

  try {
    const registerAdminUseCase = makeRegisterAdminUseCase()

    const admin = await registerAdminUseCase.execute({
      name,
      email,
      password,
      avatar,
      biography,
      location,
      socialLinks,
      role,
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

  return reply.status(201).send()
}
