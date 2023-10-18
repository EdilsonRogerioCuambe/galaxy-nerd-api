import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AdminNotFoundError } from '@/use-cases/admins/err/admin.not.found.error'
import { makeUpdateAdminUseCase } from '@/use-cases/factories/admins/make.update.admin.use.case'

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

  const { adminId } = request.params as { adminId: string }

  try {
    const updateAdminUseCase = makeUpdateAdminUseCase()

    const { admin } = await updateAdminUseCase.execute({
      adminId,
      name,
      email,
      password,
      biography,
      location,
      socialLinks,
      role,
      interests,
    })

    return reply.status(200).send({ admin })
  } catch (error) {
    if (error instanceof AdminNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
